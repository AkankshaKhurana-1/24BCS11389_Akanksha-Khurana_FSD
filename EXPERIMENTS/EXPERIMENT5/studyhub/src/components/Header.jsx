import React from 'react';
import { BookOpen, Sun, Moon } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export default function Header() {
  const { theme, toggleTheme, student } = useStudent();

  return (
    <header className="navbar">
      <div className="logo-brand">
        <BookOpen className="brand-icon" size={28} />
        <div>
          <h1>StudyHub</h1>
          <span className="subtitle">Student Productivity Portal</span>
        </div>
      </div>
      <div className="header-actions">
        <span className="user-badge">{student.uid}</span>
        <button
          className="icon-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
}
