import {MovieWithGenres} from "@/interfaces/MovieWithGenres";
import {scoreRecommendation} from "@/utils/scoring";

export function getRecommendations(referenceMovie: MovieWithGenres, allMovies: MovieWithGenres[], topN: number = 10): { movie: MovieWithGenres; score: number }[] {
    return allMovies
        .filter((candidate) => candidate.id !== referenceMovie.id)
        .map((candidate) => ({
            movie: candidate,
            score: scoreRecommendation(referenceMovie, candidate),
        }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topN);
}