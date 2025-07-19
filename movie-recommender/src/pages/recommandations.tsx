import {JSX, useState} from "react";
import {Alert, Col, Container, Row, Spinner} from 'react-bootstrap';
import {SurpriseMeButton} from "@/components/SurpriseMeButton";
import {RecommendationCard} from "@/components/RecommandationCard";

export default function RecommendationsPage(): JSX.Element {
    const [recommendations, setRecommendations] = useState<{ movie: any; score: number }[]>([]);
    const [basedOn, setBasedOn] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchSurpriseRecommendations = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/recommendations/surprise');
            const data = await res.json();
            setRecommendations(data.recommendations || data);
            setBasedOn(data.basedOn || null);
        } catch (err) {
            setError('Failed to fetch recommendations.');
        } finally {
            setIsLoading(false);
        }
    };

    return (<Container className="py-4">
            <div className="text-center mb-4">
                <SurpriseMeButton onClick={fetchSurpriseRecommendations}/>
            </div>

            {basedOn && (<h5 className="text-center text-muted mb-4">
                    Based on <strong>{basedOn.title}</strong>
                </h5>)}

            {isLoading ? (<div className="text-center my-4">
                    <Spinner animation="border" variant="primary"/>
                </div>) : null}

            {error ? <Alert variant="danger">{error}</Alert> : null}

            {recommendations.length > 0 ? (<Row className="gy-4">
                    {recommendations.map(({movie, score}) => (<Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
                            <RecommendationCard
                                title={movie.title}
                                genres={movie.genres.map((g: any) => g.name)}
                                score={score}
                                posterUrl={movie.posterPath}
                            />
                        </Col>))}
                </Row>) : (!isLoading && (
                    <p className="text-center text-muted">No recommendations yet. Try clicking “Surprise Me”! 🎲</p>))}
        </Container>);
}