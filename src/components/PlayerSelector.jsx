import React from 'react';

const PlayerSelector = ({ players, selectedPlayer, onSelect }) => {
    return (
        <div className="player-selector">
            <label htmlFor="player-select">Player:</label>
            <select
                id="player-select"
                value={selectedPlayer}
                onChange={(e) => onSelect(e.target.value)}
            >
                {players.map((name, index) => (
                    <option key={index} value={name}>
                        {name}
                    </option>
                ))}
            </select>

            <style>{`
                .player-selector {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .player-selector label {
                    font-size: 13px;
                    color: var(--secondary-text);
                    font-weight: 500;
                }
                
                .player-selector select {
                    background-color: var(--card-bg);
                    color: var(--primary-text);
                    border: 1px solid rgba(255,255,255,0.06);
                    padding: 8px 36px 8px 12px;
                    border-radius: 10px;
                    font-size: 13px;
                    outline: none;
                    cursor: pointer;
                    transition: box-shadow 0.18s, border-color 0.18s, transform 0.12s;
                    min-width: 180px;
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    appearance: none;
                    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='8' viewBox='0 0 14 8'><path fill='rgba(255,255,255,0.9)' d='M7 8L0 0h14z'/></svg>");
                    background-repeat: no-repeat;
                    background-position: right 10px center;
                    background-size: 14px 8px;
                }
                
                .player-selector select:hover {
                    border-color: var(--accent-color);
                    box-shadow: 0 6px 20px rgba(59,130,246,0.06);
                }
            `}</style>
        </div>
    );
};

export default PlayerSelector;
