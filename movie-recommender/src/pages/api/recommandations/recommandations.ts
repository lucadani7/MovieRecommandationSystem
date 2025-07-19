import {NextApiRequest, NextApiResponse} from "next";
import {getRecommendations} from "@/utils/recommandation";
import {MovieWithGenres} from "@/interfaces/MovieWithGenres";
import { prisma } from '@/lib/prisma';

export function convertScoreToMatchPercentage(score: number, maxScore: number = 20): number {
    return Math.min(100, Math.round((score / maxScore) * 100));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { tmdbId } = req.query;
    if (!tmdbId || typeof tmdbId !== 'string') {
        return res.status(400).json({ error: 'Missing or invalid tmdbId parameter.' });
    }
    const allMovies = await prisma.movie.findMany({include: { genres: true },});
    const reference = allMovies.find((movie) => movie.tmdbId === parseInt(tmdbId));
    if (!reference) {
        return res.status(404).json({ error: 'Reference movie not found.' });
    }
    const results = getRecommendations(reference as MovieWithGenres, allMovies as MovieWithGenres[]);
    return res.status(200).json(results);
}