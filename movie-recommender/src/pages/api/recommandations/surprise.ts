import {MovieWithGenres} from "@/interfaces/MovieWithGenres";
import {prisma} from "@/lib/prisma";
import {getRecommendations} from "@/utils/recommandation";
import {NextApiRequest, NextApiResponse} from "next";

export async function getSurpriseRecommendations(): Promise<{ movie: MovieWithGenres; score: number }[]> {
    const allMovies = await prisma.movie.findMany({include: {genres: true}});
    const randomMovie = allMovies[Math.floor(Math.random() * allMovies.length)];
    return getRecommendations(randomMovie as MovieWithGenres, allMovies as MovieWithGenres[]);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const results = await getSurpriseRecommendations();
    return res.status(200).json(results);
}