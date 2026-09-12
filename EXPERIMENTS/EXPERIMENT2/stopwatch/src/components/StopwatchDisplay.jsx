import React from 'react';
import { formatTimeComponents } from '../utils/formatTime';

export default function StopwatchDisplay({ timeMs, isRunning }) {
  const { hours, minutes, seconds, milliseconds } = formatTimeComponents(timeMs);
  
  // Calculate progress ring percentage based on current second (0-100%)
  const secondsNum = parseInt(seconds, 10);
  const msNum = parseInt(milliseconds, 10);
  const progressPercent = ((secondsNum * 1000 + msNum * 10) % 60000) / 60000;
  const strokeDashoffset = 565.48 * (1 - progressPercent);

  return (
    <div className="stopwatch-display-container">
      {/* Outer Progress Ring SVG */}
      <svg className="progress-ring" viewBox="0 0 200 200">
        <circle
          className="progress-ring-bg"
          cx="100"
          cy="100"
          r="90"
        />
        <circle
          className={`progress-ring-fill ${isRunning ? 'active' : ''}`}
          cx="100"
          cy="100"
          r="90"
          style={{ strokeDashoffset }}
        />
      </svg>

      {/* Main Digital Time Display */}
      <div className="time-digits-wrapper">
        <div className="time-digits">
          {hours !== '00' && (
            <>
              <span className="time-unit hours">{hours}</span>
              <span className="colon">:</span>
            </>
          )}
          <span className="time-unit minutes">{minutes}</span>
          <span className="colon">:</span>
          <span className="time-unit seconds">{seconds}</span>
          <span className="dot">.</span>
          <span className="time-unit milliseconds">{milliseconds}</span>
        </div>
        <div className="status-badge">
          <span className={`status-dot ${isRunning ? 'running' : 'paused'}`}></span>
          {isRunning ? 'RUNNING' : timeMs > 0 ? 'PAUSED' : 'READY'}
        </div>
      </div>
    </div>
  );
}
