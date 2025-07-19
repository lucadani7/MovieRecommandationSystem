import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.genre.createMany({
        data: [
            { name: 'Sci-Fi' },
            { name: 'Drama' },
            { name: 'Thriller' },
            { name: 'Adventure' },
        ],
        skipDuplicates: true,
    });

    await prisma.movie.create({
        data: {
            title: 'Interstellar',
            tmdbId: 157336,
            rating: 8.6,
            releaseYear: 2014,
            posterPath: '/interstellar.jpg',
            genres: {
                connect: [
                    { name: 'Sci-Fi' },
                    { name: 'Drama' },
                ],
            },
        },
    });

    console.log('Database seeded ✅');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
