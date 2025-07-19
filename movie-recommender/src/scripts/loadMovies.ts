import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import csv from 'csv-parser';

const prisma = new PrismaClient();
const results: any[] = [];

fs.createReadStream('./data/movies_metadata.csv')
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
        for (const entry of results.slice(0, 50)) { // Limit for dev/test
            try {
                const title = entry.title;
                const releaseYear = parseInt(entry.release_date?.slice(0, 4));
                const rating = parseFloat(entry.vote_average);
                const posterPath = entry.poster_path;

                // Extract genres (if present as JSON string)
                let genreNames: string[] = [];
                try {
                    const genreObjs = JSON.parse(entry.genres.replace(/'/g, '"'));
                    genreNames = genreObjs.map((g: any) => g.name);
                } catch (e) {}

                // Upsert genres first
                for (const name of genreNames) {
                    await prisma.genre.upsert({
                        where: { name },
                        update: {},
                        create: { name },
                    });
                }

                await prisma.movie.upsert({
                    where: { tmdbId: parseInt(entry.id) },
                    update: {},
                    create: {
                        title,
                        tmdbId: parseInt(entry.id),
                        rating,
                        releaseYear,
                        posterPath,
                        genres: {
                            connect: genreNames.map(name => ({ name })),
                        },
                    },
                });

                console.log(`✔ Imported: ${title}`);
            } catch (err) {
                console.warn(`⚠️ Skipped: ${entry.title} due to error`);
            }
        }

        console.log('🎬 Kaggle import complete!');
        prisma.$disconnect();
    });

