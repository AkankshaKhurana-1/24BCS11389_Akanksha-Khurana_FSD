import React from 'react';
import { User, Flame, CheckCircle, Clock } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export default function ProfilePanel() {
  const { student, tasks } = useStudent();
  const completedCount = tasks.filter(t => t.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <aside className="profile-card">
      <div className="avatar-wrapper">
        <User size={36} className="avatar-icon" />
      </div>
      <h2 className="student-name">{student.name}</h2>
      <p className="student-course">{student.course}</p>

      <div className="streak-badge">
        <Flame size={16} className="flame-icon" />
        <span>{student.streakDays} Day Study Streak!</span>
      </div>

      <div className="stats-mini-grid">
        <div className="stat-mini">
          <CheckCircle size={18} className="icon-completed" />
          <div>
            <span className="stat-val">{completedCount}</span>
            <span className="stat-lbl">Completed</span>
          </div>
        </div>
        <div className="stat-mini">
          <Clock size={18} className="icon-pending" />
          <div>
            <span className="stat-val">{pendingCount}</span>
            <span className="stat-lbl">Pending</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
