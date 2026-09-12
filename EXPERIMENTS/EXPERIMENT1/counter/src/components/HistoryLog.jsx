import React from 'react';
import { History, Trash2, ArrowUpRight, ArrowDownRight, RefreshCw } from 'lucide-react';

export default function HistoryLog({ history, onClearHistory }) {
  if (!history || history.length === 0) {
    return (
      <div className="history-card empty">
        <p className="empty-text">No actions logged yet.</p>
        <p className="empty-subtext">Click Increment (+), Decrement (-), or Reset to track changes.</p>
      </div>
    );
  }

  return (
    <div className="history-card">
      <div className="history-header">
        <div className="history-title">
          <History size={18} />
          <span>Activity Log ({history.length})</span>
        </div>
        <button className="btn-clear" onClick={onClearHistory} title="Clear history log">
          <Trash2 size={14} />
          <span>Clear</span>
        </button>
      </div>

      <div className="history-list-wrapper">
        <ul className="history-list">
          {history.map((item) => (
            <li key={item.id} className={`history-item history-${item.type}`}>
              <div className="history-icon">
                {item.type === 'increment' ? (
                  <ArrowUpRight size={16} />
                ) : item.type === 'decrement' ? (
                  <ArrowDownRight size={16} />
                ) : (
                  <RefreshCw size={14} />
                )}
              </div>
              <div className="history-info">
                <span className="history-action">
                  {item.type === 'increment' && `Added +${item.step}`}
                  {item.type === 'decrement' && `Subtracted -${item.step}`}
                  {item.type === 'reset' && `Reset to 0`}
                </span>
                <span className="history-time">{item.timestamp}</span>
              </div>
              <div className="history-result">
                <span className="result-label">Result:</span>
                <span className="result-value font-mono">{item.newCount}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
