import React from 'react';
import { formatNumber } from '../utils/format';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { X } from 'lucide-react';

const DetailView = ({ metric, onClose }) => {
  const chartData = metric.trend.map((val, i) => ({
    name: `Session ${i + 1}`,
    value: val
  }));

  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-modal animate-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="modal-subtitle">Performance Analytics</span>
            <h3 className="modal-title">{metric.name} Trends</h3>
          </div>
          <button className="close-button" onClick={onClose}>
            <X size={20} strokeWidth={2.5} />
          </button>
        </div>

        <div className="modal-body">
          <div className="detail-stats">
            <div className="detail-stat-item">
              <span className="stat-label">Current Value</span>
              <div className="stat-value-group">
                <span className="stat-value" style={{ color: metric.color }}>
                  {formatNumber(metric.value)}
                </span>
                <span className="stat-unit">{metric.unit}</span>
              </div>
            </div>
            <div className="detail-stat-item">
              <span className="stat-label">Last Session</span>
              <div className="stat-value-group">
                <span className="stat-value">
                  {formatNumber(metric.trend[metric.trend.length - 2])}
                </span>
                <span className="stat-unit">{metric.unit}</span>
              </div>
            </div>
            <div className="detail-stat-item">
              <span className="stat-label">Session Average</span>
              <div className="stat-value-group">
                <span className="stat-value">
                  {formatNumber(metric.trend.reduce((a, b) => a + b, 0) / metric.trend.length)}
                </span>
                <span className="stat-unit">{metric.unit}</span>
              </div>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={metric.color} stopOpacity={0.6} />
                    <stop offset="95%" stopColor={metric.color} stopOpacity={0} />
                  </linearGradient>
                  <filter id="shadowDetail">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis
                  dataKey="name"
                  stroke="var(--secondary-text)"
                  fontSize={11}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  dy={10}
                />
                <YAxis
                  stroke="var(--secondary-text)"
                  fontSize={11}
                  fontWeight={600}
                  tickLine={false}
                  axisLine={false}
                  dx={-10}
                  unit={metric.unit === '%' ? '%' : ''}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(26, 26, 36, 0.9)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    boxShadow: 'var(--shadow)',
                    color: 'white'
                  }}
                  itemStyle={{ color: metric.color, fontWeight: 700 }}
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 2 }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={metric.color}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  strokeWidth={4}
                  animationDuration={1500}
                  filter="url(#shadowDetail)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="modal-footer">
          <div className="insight-card">
            <div className="insight-icon" style={{ backgroundColor: `${metric.color}20`, color: metric.color }}>
              <X size={16} /> {/* Replace with dynamic icon later */}
            </div>
            <p className="insight-text">
              Performance has increased by <strong style={{ color: 'var(--success-color)' }}>5.4%</strong> compared to the previous 7-day average.
              The current trajectory suggests meeting the seasonal target within 2 weeks.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .detail-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.4s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .detail-modal {
          background-color: var(--card-bg);
          backdrop-filter: var(--glass-blur);
          width: 90%;
          max-width: 860px;
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          overflow: hidden;
          box-shadow: var(--shadow);
        }
        
        .modal-header {
          padding: 28px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        
        .modal-subtitle {
          font-size: 11px;
          text-transform: uppercase;
          color: var(--accent-color);
          font-weight: 800;
          letter-spacing: 2px;
        }
        
        .modal-title {
          font-size: 28px;
          font-weight: 900;
          color: var(--primary-text);
          margin-top: 4px;
          letter-spacing: -0.5px;
        }
        
        .close-button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: var(--secondary-text);
          cursor: pointer;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .close-button:hover {
          background: rgba(239, 68, 68, 0.15);
          color: var(--danger-color);
          border-color: var(--danger-color);
          transform: rotate(90deg);
        }
        
        .modal-body {
          padding: 40px;
        }
        
        .detail-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-bottom: 48px;
        }
        
        .detail-stat-item {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          border: 1px solid var(--border-color);
        }
        
        .stat-label {
          font-size: 12px;
          color: var(--secondary-text);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-value-group {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        
        .stat-value {
          font-size: 32px;
          font-weight: 900;
          line-height: 1;
        }
        
        .stat-unit {
          font-size: 14px;
          color: var(--secondary-text);
          font-weight: 600;
        }
        
        .chart-container {
          background: rgba(0, 0, 0, 0.2);
          padding: 24px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .modal-footer {
          padding: 28px 40px;
          background-color: rgba(255, 255, 255, 0.01);
          border-top: 1px solid var(--border-color);
        }

        .insight-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(59, 130, 246, 0.05);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(59, 130, 246, 0.1);
        }

        .insight-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .insight-text {
          font-size: 14px;
          color: var(--secondary-text);
          line-height: 1.6;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default DetailView;
