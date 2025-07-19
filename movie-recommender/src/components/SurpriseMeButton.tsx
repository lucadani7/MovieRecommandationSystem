import {SurpriseMeButtonProps} from "@/interfaces/SurpriseMeButtonProps";
import React from "react";

export const SurpriseMeButton: React.FC<SurpriseMeButtonProps> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor: '#3498db',
                color: '#fff',
                border: 'none',
                padding: '12px 20px',
                fontSize: '16px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease',
            }}
        >
            Surprise Me
        </button>
    );
};