import React from 'react';
import { useStudent } from '../context/StudentContext';

export default function TaskStats() {
  const { tasks } = useStudent();
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="stats-card">
      <div className="stats-header">
        <span>Completion Progress</span>
        <span className="stats-percentage">{percentage}%</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
}
