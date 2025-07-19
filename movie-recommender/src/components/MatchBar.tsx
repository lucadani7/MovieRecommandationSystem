import React from "react";
import {convertScoreToMatchPercentage} from "@/pages/api/recommandations/recommandations";
import {MatchBarProps} from "@/interfaces/MatchBarProps";

export const MatchBar: React.FC<MatchBarProps> = ({ score, maxScore = 20 }) => {
    const percentage: number = convertScoreToMatchPercentage(score, maxScore);
    const getColor = (value: number): string => {
        if (value >= 90) {
            return '#e74c3c';
        }
        if (value >= 75) {
            return '#f39c12';
        }
        if (value >= 60) {
            return '#f1c40f';
        }
        return '#bdc3c7';
    }

    return (
        <div style={{ marginTop: '8px' }}>
            <div
                style={{
                    height: '8px',
                    width: '100%',
                    backgroundColor: '#ecf0f1',
                    borderRadius: '4px',
                    overflow: 'hidden',
                }}
            >
                <div
                    style={{
                        width: `${percentage}%`,
                        backgroundColor: getColor(percentage),
                        height: '100%',
                        transition: 'width 0.5s ease',
                    }}
                />
            </div>
            <div style={{ fontSize: '12px', marginTop: '4px', textAlign: 'right', color: '#7f8c8d' }}>
                {percentage}% match
            </div>
        </div>
    );
};