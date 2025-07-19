import {useState} from 'react';
import Head from 'next/head';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const searchMovies = async (): Promise<void> => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${encodeURIComponent(query)}`);
            const data = await res.json();
            setMovies(data.results || []);
        } catch (error) {
            console.error('Error fetching movies:', error);
        } finally {
            setLoading(false);
        }
    };

    return (<>
        <Head>
            <title>Search Movies</title>
        </Head>

        <div className="container py-4">
            <h1 className="mb-4">Search Movies</h1>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter movie title..."
                />
                <button className="btn btn-primary" onClick={searchMovies}>
                    Search
                </button>
            </div>

            {loading && <p>Loading...</p>}

            <div className="row">
                {movies.map((movie) => (<div className="col-md-4 mb-4" key={movie.id}>
                        <div className="card h-100">
                            {movie.poster_path && (<img
                                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                                    className="card-img-top"
                                    alt={movie.title}
                                />)}
                            <div className="card-body">
                                <h5 className="card-title">{movie.title}</h5>
                                <p className="card-text">{movie.overview}</p>
                            </div>
                        </div>
                    </div>))}
            </div>

            {movies.length === 0 && !loading && (
                <p className="text-muted">No results found. Try a different title.</p>)}
        </div>
    </>);
}