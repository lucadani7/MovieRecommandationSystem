import {Genre} from "@/interfaces/Genre";

export interface MovieWithGenres {
    id: number;
    tmdbId: number;
    title: string;
    releaseDate?: string;
    rating?: number;
    genres: Genre[];
}