import React, { useState } from 'react';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';
import TaskStats from './TaskStats';
import { useStudent } from '../context/StudentContext';

export default function TaskManager() {
  const { tasks } = useStudent();
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div className="task-manager-container">
      <TaskStats />
      <AddTaskForm />

      <div className="filter-row">
        <h3>Academic Tasks</h3>
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All ({tasks.length})
          </button>
          <button
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending ({tasks.filter(t => !t.completed).length})
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Done ({tasks.filter(t => t.completed).length})
          </button>
        </div>
      </div>

      <TaskList tasks={filteredTasks} />
    </div>
  );
}
