import React from 'react';
import { formatTime } from '../utils/formatTime';
import { Zap, Gauge, Timer, Layers } from 'lucide-react';

export default function StatsSummary({ laps, fastestLapTime, slowestLapTime, averageLapTime }) {
  if (!laps || laps.length === 0) return null;

  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon icon-count">
          <Layers size={18} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Total Laps</span>
          <span className="stat-value">{laps.length}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-fastest">
          <Zap size={18} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Best Lap</span>
          <span className="stat-value font-mono">{formatTime(fastestLapTime)}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-slowest">
          <Timer size={18} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Worst Lap</span>
          <span className="stat-value font-mono">{formatTime(slowestLapTime)}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon icon-avg">
          <Gauge size={18} />
        </div>
        <div className="stat-info">
          <span className="stat-label">Avg Lap Time</span>
          <span className="stat-value font-mono">{formatTime(averageLapTime)}</span>
        </div>
      </div>
    </div>
  );
}
