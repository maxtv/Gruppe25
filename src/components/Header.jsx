import React, { useEffect, useRef, useState } from 'react';
import PlayerSelector from './PlayerSelector';

const Header = ({ players, selectedPlayer, onPlayerChange, playerPhoto, dataFilter, onFilterChange }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      if (window.scrollY > 6) el.classList.add('scrolled');
      else el.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Theme handling
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('theme') || 'dark';
    } catch (e) {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'));

  return (
    <header ref={ref} className="main-header animate-in">
      <div className="logo-section">
        <div className="logo-container">
          <img
            src="/logo.png"
            alt="Logo"
            className="header-logo"
            onError={(e) => e.target.style.display = 'none'}
          />
          <div className="logo-placeholder">PERFORMANCE</div>
        </div>
        <div className="divider"></div>
        <div className="title-group">
          <h1 className="page-title">Performance Dashboard</h1>
          <span className="live-indicator">
            <span className="live-dot"></span>
            LIVE SESSION
          </span>
        </div>
      </div>

      <div className="header-controls">
        <div className="filter-buttons">
          <button className={dataFilter === 'all' ? 'active' : ''} onClick={() => onFilterChange('all')}>All</button>
          <button className={dataFilter === 'csv' ? 'active' : ''} onClick={() => onFilterChange('csv')}>CSV</button>
          <button className={dataFilter === 'external' ? 'active' : ''} onClick={() => onFilterChange('external')}>External</button>
        </div>

        {playerPhoto && (
          <img src={playerPhoto} alt="player avatar" className="header-avatar" onError={(e)=>e.target.style.display='none'} />
        )}

        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle color theme">{theme === 'light' ? '🌞' : '🌙'}</button>

        <PlayerSelector
          players={players}
          selectedPlayer={selectedPlayer}
          onSelect={onPlayerChange}
        />
      </div>

        <style>{`
        .main-header {
          height: 72px;
          background-color: var(--card-bg);
          backdrop-filter: var(--glass-blur);
          border-bottom: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 32px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
          position: sticky;
          top: 0;
          z-index: 1000;
        }
        .main-header.scrolled {
          transform: translateY(-1px);
          box-shadow: 0 10px 40px rgba(0,0,0,0.5), 0 6px 20px rgba(0,0,0,0.25);
          border-bottom-color: rgba(255,255,255,0.06);
          backdrop-filter: blur(10px) saturate(120%);
        }
        
        .logo-section {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        
        .logo-container {
          display: flex;
          align-items: center;
          height: 36px;
        }

        .header-logo {
          max-height: 100%;
          width: auto;
          object-fit: contain;
          margin-right: 12px;
          filter: drop-shadow(0 0 4px rgba(255, 255, 255, 0.2));
        }

        .logo-placeholder {
          background: linear-gradient(135deg, var(--accent-color), #60a5fa);
          padding: 6px 12px;
          border-radius: 8px;
          font-weight: 900;
          font-size: 10px;
          color: white;
          letter-spacing: 2px;
          display: none;
          box-shadow: 0 4px 12px var(--accent-glow);
        }

        .header-logo:not([src]), 
        .header-logo[style*="display: none"] + .logo-placeholder {
          display: flex;
        }
        
        .divider {
          width: 1px;
          height: 28px;
          background-color: var(--border-color);
        }

        .title-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        
        .page-title {
          font-size: 16px;
          font-weight: 800;
          color: var(--primary-text);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .live-indicator {
          font-size: 9px;
          font-weight: 700;
          color: var(--success-color);
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: 0.5px;
        }

        .live-dot {
          width: 6px;
          height: 6px;
          background-color: var(--success-color);
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        
        .header-controls {
          display: flex;
          align-items: center;
        }

        .filter-buttons {
          display: flex;
          gap: 8px;
          margin-right: 12px;
        }

        .theme-toggle {
          margin-right: 12px;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.06);
          color: var(--primary-text);
          padding: 6px 10px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        .theme-toggle:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.12); }

        .filter-buttons button {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.06);
          color: var(--primary-text);
          padding: 6px 10px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 700;
        }

        .filter-buttons button.active {
          background: linear-gradient(90deg,var(--accent-color),#60a5fa);
          border-color: var(--accent-color);
          box-shadow: 0 6px 18px rgba(59,130,246,0.12);
          color: white;
        }

        .header-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 12px;
          border: 2px solid rgba(255,255,255,0.06);
          box-shadow: 0 8px 20px rgba(0,0,0,0.5), 0 4px 12px var(--accent-glow);
        }
      `}</style>
    </header>
  );
};

export default Header;
