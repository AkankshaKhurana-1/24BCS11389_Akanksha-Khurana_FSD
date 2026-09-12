import React from 'react';
import { Plus, Minus, RotateCcw, TrendingUp, TrendingDown } from 'lucide-react';

export default function Counter({ count, step, onIncrement, onDecrement, onReset }) {
  const getStatusColor = () => {
    if (count > 0) return 'status-positive';
    if (count < 0) return 'status-negative';
    return 'status-zero';
  };

  return (
    <div className="counter-card">
      {/* Visual Status Indicator */}
      <div className={`counter-badge ${getStatusColor()}`}>
        {count > 0 ? (
          <><TrendingUp size={14} /> Positive</>
        ) : count < 0 ? (
          <><TrendingDown size={14} /> Negative</>
        ) : (
          'Zero'
        )}
      </div>

      {/* Main Counter Display */}
      <div className="counter-display">
        <span className={`count-number ${getStatusColor()}`}>{count}</span>
      </div>

      {/* Counter Controls: Increment, Decrement, Reset */}
      <div className="counter-controls">
        <button
          className="btn btn-decrement"
          onClick={onDecrement}
          title={`Decrement by ${step} (Key: - or Down Arrow)`}
        >
          <Minus size={24} />
          <span>-{step}</span>
        </button>

        <button
          className="btn btn-reset"
          onClick={onReset}
          title="Reset counter to 0 (Key: R)"
        >
          <RotateCcw size={20} />
          <span>Reset</span>
        </button>

        <button
          className="btn btn-increment"
          onClick={onIncrement}
          title={`Increment by ${step} (Key: + or Up Arrow)`}
        >
          <Plus size={24} />
          <span>+{step}</span>
        </button>
      </div>
    </div>
  );
}
