import React from 'react';
import { formatTime } from '../utils/formatTime';
import { Download, Trash2, Trophy, Flame } from 'lucide-react';

export default function LapList({ laps, fastestLapId, slowestLapId, onClearLaps }) {
  if (!laps || laps.length === 0) {
    return (
      <div className="laps-card empty">
        <p className="empty-text">No laps recorded yet.</p>
        <p className="empty-subtext">Click "Lap" while running or press <kbd>L</kbd> to record split times.</p>
      </div>
    );
  }

  const exportCSV = () => {
    const headers = ['Lap Number', 'Lap Time', 'Overall Time'];
    const rows = laps.map(lap => [
      `Lap ${lap.id}`,
      formatTime(lap.lapTimeMs),
      formatTime(lap.overallTimeMs)
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `stopwatch-laps-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="laps-card">
      <div className="laps-header">
        <h3>Lap Records ({laps.length})</h3>
        <div className="laps-actions">
          <button className="btn-small" onClick={exportCSV} title="Export CSV">
            <Download size={15} />
            <span>Export</span>
          </button>
          <button className="btn-small btn-danger" onClick={onClearLaps} title="Clear Laps">
            <Trash2 size={15} />
            <span>Clear</span>
          </button>
        </div>
      </div>

      <div className="laps-table-wrapper">
        <table className="laps-table">
          <thead>
            <tr>
              <th>Lap #</th>
              <th>Lap Time</th>
              <th>Overall Time</th>
            </tr>
          </thead>
          <tbody>
            {[...laps].reverse().map(lap => {
              const isFastest = lap.id === fastestLapId && laps.length > 1;
              const isSlowest = lap.id === slowestLapId && laps.length > 1;

              return (
                <tr
                  key={lap.id}
                  className={`lap-row ${isFastest ? 'fastest-row' : ''} ${isSlowest ? 'slowest-row' : ''}`}
                >
                  <td className="lap-number">
                    <span>Lap {lap.id}</span>
                    {isFastest && (
                      <span className="badge badge-fastest" title="Fastest Lap">
                        <Trophy size={12} /> Fastest
                      </span>
                    )}
                    {isSlowest && (
                      <span className="badge badge-slowest" title="Slowest Lap">
                        <Flame size={12} /> Slowest
                      </span>
                    )}
                  </td>
                  <td className="lap-time font-mono">{formatTime(lap.lapTimeMs)}</td>
                  <td className="overall-time font-mono">{formatTime(lap.overallTimeMs)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
