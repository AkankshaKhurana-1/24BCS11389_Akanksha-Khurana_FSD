import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

const initialTasks = [
  { id: 1, title: 'Complete React Experiment 4 Assignment', subject: 'Full Stack Dev', dueDate: '2026-09-15', priority: 'High', completed: false },
  { id: 2, title: 'Review Database Normalization (3NF)', subject: 'DBMS', dueDate: '2026-09-18', priority: 'Medium', completed: true },
  { id: 3, title: 'Prepare Presentation on Web Performance', subject: 'Web Tech', dueDate: '2026-09-20', priority: 'Low', completed: false }
];

export function StudentProvider({ children }) {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('studyhub_tasks');
    return saved ? JSON.parse(saved) : initialTasks;
  });

  const [student, setStudent] = useState({
    name: 'Akanksha Khurana',
    uid: '24BCS11389',
    course: 'Computer Science Engineering',
    streakDays: 7
  });

  const [theme, setTheme] = useState(() => localStorage.getItem('studyhub_theme') || 'dark');

  useEffect(() => {
    localStorage.setItem('studyhub_tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('studyhub_theme', theme);
  }, [theme]);

  const addTask = (newTask) => {
    const taskObj = {
      id: Date.now(),
      ...newTask,
      completed: false
    };
    setTasks((prev) => [taskObj, ...prev]);
  };

  const toggleTaskComplete = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <StudentContext.Provider
      value={{
        tasks,
        student,
        theme,
        addTask,
        toggleTaskComplete,
        deleteTask,
        toggleTheme
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  return useContext(StudentContext);
}
