import {MovieWithGenres} from "@/interfaces/MovieWithGenres";
import {Genre} from "@/interfaces/Genre";

export function scoreRecommendation(target: MovieWithGenres, candidate: MovieWithGenres): number {
    let score: number = 0;

    // Genre overlap
    const sharedGenres: Genre[] = candidate.genres.filter((genre) => target.genres.some((g) => g.id === genre.id));
    score += sharedGenres.length * 2; // weighted genre match

    // Rating proximity
    const ratingDiff: number = Math.abs((candidate.rating ?? 0) - (target.rating ?? 0));
    score += Math.max(0, 5 - ratingDiff) * 1.5;

    // Release year proximity
    const yearTarget: number = !target.releaseDate ? 0 : new Date(target.releaseDate).getFullYear();
    const yearCandidate: number = !candidate.releaseDate ? 0 : new Date(candidate.releaseDate).getFullYear();
    const yearDiff: number = Math.abs(yearTarget - yearCandidate);
    score += Math.max(0, 5 - yearDiff);

    return score;
}