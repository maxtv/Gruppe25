import React from 'react';

const PlayerOverview = ({ player, selectedDataView, onDataViewChange }) => {
  const sources = player?._sources || (player?._source ? [player._source] : []);
    return (
      <section className="player-overview">
        <div className="player-avatar-container">
          {player.photo ? (
            <img
              src={player.photo}
              alt={`${player.name} photo`}
              className="player-avatar"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <div className="player-avatar-placeholder">Player Photo</div>
          )}
        </div>
        <div className="player-details">
                <div style={{display:'flex',flexDirection:'column',gap:8}}>
                  <div className="player-main-info">
                    <h2 className="player-name">{player.name}</h2>
                    <span className="player-position">{player.position}</span>
                  </div>
                  <div className="player-source-toggle">
                    {sources.includes('playermaker') && (
                      <button aria-label="Show Playermaker data" className={selectedDataView === 'playermaker' ? 'active' : ''} onClick={() => onDataViewChange('playermaker')}>Playermaker</button>
                    )}
                    {sources.includes('catapult') && (
                      <button aria-label="Show Catapult data" className={selectedDataView === 'catapult' ? 'active' : ''} onClick={() => onDataViewChange('catapult')}>Catapult</button>
                    )}
                    <button aria-label="Show merged data" className={selectedDataView === 'merged' ? 'active' : ''} onClick={() => onDataViewChange('merged')}>Merged</button>
                    <button aria-label="Export metrics CSV" className="export-btn" onClick={() => {
                      const rows = metricsFromRaw(player._raw || {}, selectedDataView); // helper below
                      const csv = rows.map(r=>`${r.metric},${r.value},${r.unit}`).join('\n');
                      const blob = new Blob(["metric,value,unit\n"+csv], { type: 'text/csv' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a'); a.href = url; a.download = `${player.name.replace(/\s+/g,'_')}_metrics.csv`; a.click(); URL.revokeObjectURL(url);
                    }}>Export CSV</button>
                  </div>
                </div>
                <div className="session-info">
                    <div className="status-dot"></div>
                    <span className="session-label">{player.session}</span>
                </div>
            </div>

            {/* comparison panel showing raw per-source values when present */}
            <div className="player-raw-compare">
              {player._raw && Object.keys(player._raw).length > 0 && (
                <table>
                  <thead>
                    <tr><th>Source</th><th>Distance (m)</th><th>Top Speed</th><th>Sprints</th><th>Touches</th></tr>
                  </thead>
                  <tbody>
                    {['csv','playermaker','catapult'].map(src => {
                      const r = player._raw[src];
                      if (!r) return null;
                      return (
                        <tr key={src}>
                          <td>{src.toUpperCase()}</td>
                          <td>{r['Distance Covered (m)'] || r['total_distance_m'] || '-'}</td>
                          <td>{r['Top Speed (m/s)'] || r['max_speed_kph'] ? (r['Top Speed (m/s)'] || (r['max_speed_kph']/3.6).toFixed(2)) : '-'}</td>
                          <td>{r['Sprint Count (#)'] || r['sprint_count'] || '-'}</td>
                          <td>{r['Total Touches (#)'] || r['touches'] || '-'}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            <style>{`
        .player-overview {
          background-color: var(--card-bg);
          border-radius: 12px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          gap: 20px;
          border: 1px solid var(--border-color);
        }
        
        .player-avatar-container {
          position: relative;
        }
        
        .player-avatar-placeholder {
          width: 60px;
          height: 60px;
          background-color: var(--bg-color);
          border: 2px solid var(--accent-color);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          color: var(--secondary-text);
          text-align: center;
          line-height: 1.2;
          padding: 4px;
        }

        .player-avatar {
          width: 72px;
          height: 72px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid var(--accent-color);
          box-shadow: 0 8px 30px rgba(0,0,0,0.6), 0 4px 12px var(--accent-glow);
          display: block;
        }
        
        .player-details {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .player-main-info {
          display: flex;
          align-items: baseline;
          gap: 12px;
        }
        
        .player-name {
          font-size: 28px;
          font-weight: 700;
          color: var(--primary-text);
          letter-spacing: -0.5px;
        }
        
        .player-position {
          font-size: 14px;
          color: var(--accent-color);
          font-weight: 600;
          text-transform: uppercase;
        }
        
        .session-info {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background-color: var(--success-color);
          border-radius: 50%;
          box-shadow: 0 0 8px var(--success-color);
        }
        
        .session-label {
          font-size: 13px;
          color: var(--secondary-text);
          font-weight: 400;
        }
        .player-source-toggle {
          display: flex;
          gap: 8px;
          margin-top: 6px;
        }

        .player-source-toggle button {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.06);
          color: var(--primary-text);
          padding: 6px 10px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
          font-size: 12px;
        }

        .player-source-toggle button.active {
          background: linear-gradient(90deg,var(--accent-color),#60a5fa);
          border-color: var(--accent-color);
          color: white;
          box-shadow: 0 6px 18px rgba(59,130,246,0.12);
        }
          .export-btn { margin-left: 8px; background: rgba(255,255,255,0.02); }

          .player-raw-compare { margin-top: 12px; overflow:auto; }
          .player-raw-compare table { width:100%; border-collapse: collapse; font-size:13px; }
          .player-raw-compare th, .player-raw-compare td { padding: 8px 10px; text-align:left; border-bottom:1px solid rgba(255,255,255,0.03); }
      `}</style>
        </section>
    );
};

export default PlayerOverview;

// helper to derive metrics rows for CSV export from raw object and selected view
function metricsFromRaw(raw, view) {
  const r = (view === 'merged') ? (raw.merged || raw.csv || raw.playermaker || raw.catapult) : (raw[view] || raw.csv || raw.playermaker || raw.catapult);
  if (!r) return [];
  return [
    { metric: 'Total Distance', value: (parseFloat(r['Distance Covered (m)'])/1000 || 0).toFixed(2), unit: 'km' },
    { metric: 'Top Speed', value: (parseFloat(r['Top Speed (m/s)'])*3.6 || 0).toFixed(1), unit: 'km/h' },
    { metric: 'Sprints', value: r['Sprint Count (#)'] || r['sprint_count'] || 0, unit: 'count' },
    { metric: 'Touches', value: r['Total Touches (#)'] || r['touches'] || 0, unit: 'count' }
  ];
}
