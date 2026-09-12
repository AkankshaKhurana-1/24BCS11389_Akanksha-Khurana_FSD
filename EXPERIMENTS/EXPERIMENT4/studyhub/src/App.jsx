import React from 'react';
import { StudentProvider } from './context/StudentContext';
import Header from './components/Header';
import ProfilePanel from './components/ProfilePanel';
import TaskManager from './components/TaskManager';

export default function App() {
  return (
    <StudentProvider>
      <div className="app-container">
        <Header />
        <main className="main-layout">
          <ProfilePanel />
          <TaskManager />
        </main>
        <footer className="footer">
          <p>StudyHub | Productivity Portal for Students</p>
        </footer>
      </div>
    </StudentProvider>
  );
}
