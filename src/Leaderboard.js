import React from 'react';

export function Leaderboard({ leaders }) {
    return (
        <div>
            <h2>Таблица лидеров</h2>
            <ol>
                {leaders
                    .sort((a, b) => b.score - a.score)
                    .map((leader, index) => (
                        <li key={index}>{leader.name}: {leader.score}</li>
                    ))}
            </ol>
        </div>
    );
}

