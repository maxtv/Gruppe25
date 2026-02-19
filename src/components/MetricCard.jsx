import React from 'react';
import { formatNumber } from '../utils/format';
import {
  AreaChart, Area, ResponsiveContainer, Tooltip,
  BarChart, Bar, Cell
} from 'recharts';

const MetricCard = ({ metric, onClick, sources = [] }) => {
  // Simple mini sparkline for the trend
  const trendData = metric.trend.map((val, i) => ({ value: val, index: i }));

  // Progress calculation for radial/bar indicator
  const progress = Math.min((metric.value / metric.target) * 100, 100);

  return (
    <div className="metric-card card-sheen animate-in" onClick={() => onClick(metric)} aria-label={`Metric ${metric.name}`}>
      <div className="card-header">
        <span className="metric-label">{metric.name}</span>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          {/* source badges (if provided via sources prop) */}
          {Array.isArray(sources) && sources.length > 0 && (
            <div className="source-badges">
              {sources.map(s => (
                <span key={s} className={`badge badge-${s}`}>{s === 'playermaker' ? 'PM' : s === 'catapult' ? 'CAT' : s.toUpperCase()}</span>
              ))}
            </div>
          )}
          <div className="accent-dot" style={{ backgroundColor: metric.color }}></div>
        </div>
      </div>

      <div className="card-main">
        <div className="value-container">
          <span className="metric-value">{formatNumber(metric.value)}</span>
          <span className="metric-unit">{metric.unit}</span>
        </div>

        <div className="visual-indicator">
          {metric.id === 'passAcc' ? (
            <div className="circular-progress">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                  strokeDasharray={`${progress}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  stroke={metric.color}
                />
              </svg>
              <span className="progress-text" style={{ color: metric.color }}>{Math.round(progress)}%</span>
            </div>
          ) : (
            <div className="mini-chart-container">
              <ResponsiveContainer width="100%" height={50}>
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={metric.color} stopOpacity={0.5} />
                      <stop offset="95%" stopColor={metric.color} stopOpacity={0} />
                    </linearGradient>
                    <filter id={`glow-${metric.id}`}>
                      <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={metric.color}
                    fillOpacity={1}
                    fill={`url(#gradient-${metric.id})`}
                    strokeWidth={2.5}
                    filter={`url(#glow-${metric.id})`}
                  />
                  <Tooltip />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      <div className="card-footer">
        <div className="progress-info">
          <span className="target-label">Target: {formatNumber(metric.target)}</span>
          <span className="progress-percent">{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{
              width: `${progress}%`,
              backgroundColor: metric.color,
              boxShadow: `0 0 8px ${metric.color}80`
            }}
          ></div>
        </div>
      </div>

      <style>{`
        .metric-card {
          background-color: var(--card-bg);
          backdrop-filter: var(--glass-blur);
          border-radius: 20px;
          padding: 24px;
          border: 1px solid var(--glass-border);
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          flex-direction: column;
          gap: 20px;
          position: relative;
          overflow: hidden;
        }
        
        .metric-card:hover {
          background-color: var(--card-bg-hover);
          transform: translateY(-6px) scale(1.02);
          box-shadow: var(--shadow);
          border-color: var(--accent-color);
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .metric-label {
          font-size: 11px;
          font-weight: 700;
          color: var(--secondary-text);
          text-transform: uppercase;
          letter-spacing: 1.5px;
        }

        .accent-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          box-shadow: 0 0 8px currentColor;
        }
        .source-badges { display:flex; gap:6px; align-items:center; }
        .badge { font-size:10px; padding:6px 8px; border-radius:8px; font-weight:800; }
        .badge-playermaker { background: rgba(59,130,246,0.12); color: var(--accent-color); border:1px solid rgba(59,130,246,0.12); }
        .badge-catapult { background: rgba(16,185,129,0.08); color: var(--success-color); border:1px solid rgba(16,185,129,0.06); }
        .badge-csv { background: rgba(255,255,255,0.03); color: var(--secondary-text); border:1px solid rgba(255,255,255,0.04); }
        
        .card-main {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          gap: 12px;
        }
        
        .value-container {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        
        .metric-value {
          font-size: 36px;
          font-weight: 800;
          color: var(--primary-text);
          line-height: 0.9;
          letter-spacing: -1px;
        }
        
        .metric-unit {
          font-size: 14px;
          color: var(--secondary-text);
          font-weight: 600;
        }
        
        .visual-indicator {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          max-width: 100px;
        }
        
        .mini-chart-container {
          width: 100%;
          height: 50px;
        }
        
        .circular-progress {
          position: relative;
          width: 48px;
          height: 48px;
        }
        
        .circular-chart {
          display: block;
          margin: 0 auto;
          max-width: 100%;
          max-height: 100%;
        }
        
        .circle-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.03);
          stroke-width: 3;
        }
        
        .circle {
          fill: none;
          stroke-width: 3;
          stroke-linecap: round;
          transition: stroke-dasharray 0.5s ease;
        }
        
        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 10px;
          font-weight: 800;
        }
        
        .card-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .progress-bar-bg {
          height: 6px;
          background-color: rgba(255, 255, 255, 0.03);
          border-radius: 3px;
          overflow: hidden;
        }
        
        .progress-bar-fill {
          height: 100%;
          border-radius: 3px;
          transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .target-label {
          font-size: 11px;
          color: var(--secondary-text);
          font-weight: 600;
        }

        .progress-percent {
          font-size: 11px;
          font-weight: 700;
          color: var(--primary-text);
        }
      `}</style>
    </div>
  );
};

export default MetricCard;
