import React from 'react';
import { Play, Pause, Flag, RotateCcw } from 'lucide-react';

export default function Controls({ isRunning, timeMs, onStart, onPause, onLap, onReset }) {
  return (
    <div className="controls-wrapper">
      {/* Reset Button */}
      <button
        className="btn btn-secondary btn-icon"
        onClick={onReset}
        disabled={timeMs === 0 && !isRunning}
        title="Reset Stopwatch (Key: R)"
      >
        <RotateCcw size={20} />
        <span>Reset</span>
      </button>

      {/* Main Start / Pause Toggle Button */}
      {!isRunning ? (
        <button
          className="btn btn-primary btn-start"
          onClick={onStart}
          title="Start / Resume (Key: Space)"
        >
          <Play size={22} fill="currentColor" />
          <span>{timeMs === 0 ? 'Start' : 'Resume'}</span>
        </button>
      ) : (
        <button
          className="btn btn-warning btn-pause"
          onClick={onPause}
          title="Pause (Key: Space)"
        >
          <Pause size={22} fill="currentColor" />
          <span>Pause</span>
        </button>
      )}

      {/* Lap Button */}
      <button
        className="btn btn-secondary btn-icon"
        onClick={onLap}
        disabled={!isRunning}
        title="Record Lap (Key: L)"
      >
        <Flag size={20} />
        <span>Lap</span>
      </button>
    </div>
  );
}
