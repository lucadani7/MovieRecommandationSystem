import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import Head from 'next/head';

export default function MovieDetails() {
    const router = useRouter();
    const {id} = router.query;
    const [movie, setMovie] = useState<any>(null);
    const [trailerKey, setTrailerKey] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            return;
        }

        const fetchMovieDetailsAndVideo = async () => {
            try {
                const [movieRes, videoRes] = await Promise.all([fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`), fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`),]);
                const movieData = await movieRes.json();
                const videoData = await videoRes.json();
                setMovie(movieData);
                const trailer = videoData?.results?.find((vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube');
                if (trailer) {
                    setTrailerKey(trailer.key); // YouTube video ID
                }
            } catch (error) {
                console.error('Error fetching movie or trailer:', error);
            }
        };
        void fetchMovieDetailsAndVideo();
    }, [id]);

    return (<>
        <Head>
            <title>{movie?.title || 'Movie Details'}</title>
        </Head>

        <div className="container py-5">
            {movie && (<div className="card mb-4">
                <div className="row g-0">
                    <div className="col-md-4">
                        {movie.poster_path && (<img
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                            className="img-fluid rounded-start"
                        />)}
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title">{movie.title}</h2>
                            <p className="card-text">{movie.overview}</p>
                            <p className="card-text">
                                <strong>Release Date:</strong> {movie.release_date}
                            </p>
                            <p className="card-text">
                                <strong>Rating:</strong> {movie.vote_average}
                            </p>
                            <button
                                className="btn btn-outline-primary"
                                data-bs-toggle="modal"
                                data-bs-target="#trailerModal"
                            >
                                Watch Trailer
                            </button>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>

        <div
            className="modal fade"
            id="trailerModal"
            tabIndex={-1}
            aria-labelledby="trailerModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="trailerModalLabel">
                            {movie?.title} Trailer
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="modal-body">
                        {/* Embed a YouTube trailer if available */}
                        {trailerKey ? (<iframe
                                width="100%"
                                height="400"
                                src={`https://www.youtube.com/embed/${trailerKey}`}
                                title="Trailer"
                                allowFullScreen
                            ></iframe>) : (<p>No trailer available for this movie.</p>)}
                    </div>
                </div>
            </div>
        </div>
    </>);
}