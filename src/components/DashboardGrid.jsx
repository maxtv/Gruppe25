import React from 'react';
import MetricCard from './MetricCard';

const DashboardGrid = ({ metrics, onCardClick, playerSources = [] }) => {
  return (
      <div className="dashboard-grid">
      {metrics.map((metric) => (
        <MetricCard
          key={metric.id}
          metric={metric}
          onClick={onCardClick}
          sources={playerSources}
        />
      ))}

      <style>{`
        .dashboard-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 20px;
          width: 100%;
        }

        /* each card uses the default flow now */
        .metric-card { grid-column: auto; }

        @media (max-width: 768px) {
          .dashboard-grid { grid-template-columns: 1fr; gap: 16px; }
        }
      `}</style>
    </div>
  );
};

export default DashboardGrid;
