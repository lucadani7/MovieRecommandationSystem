import {RecommendationCardProps} from "@/interfaces/RecommendationCardProps";
import React from "react";
import {MatchBar} from "@/components/MatchBar";

export const RecommendationCard: React.FC<RecommendationCardProps> = ({title, genres, score, posterUrl,}) => {
    return (
        <div style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            gap: '16px',
            backgroundColor: '#fff',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
            {posterUrl && (
                <img src={posterUrl} alt={title} style={{ width: '80px', borderRadius: '8px' }} />
            )}
            <div style={{ flex: 1 }}>
                <h3 style={{ marginBottom: '4px' }}>{title}</h3>
                <p style={{ fontSize: '14px', color: '#999', marginBottom: '8px' }}>
                    {genres.join(', ')}
                </p>
                <MatchBar score={score} />
            </div>
        </div>
    );
};