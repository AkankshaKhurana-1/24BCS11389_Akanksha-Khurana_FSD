import React from 'react';
import { Check, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export default function TaskList({ tasks }) {
  const { toggleTaskComplete, deleteTask } = useStudent();

  if (tasks.length === 0) {
    return (
      <div className="empty-tasks-card">
        <p>No tasks matching current filter.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`task-item ${task.completed ? 'completed' : ''} priority-${task.priority.toLowerCase()}`}
        >
          <button
            className={`checkbox-btn ${task.completed ? 'checked' : ''}`}
            onClick={() => toggleTaskComplete(task.id)}
            title={task.completed ? 'Mark as Pending' : 'Mark as Complete'}
          >
            {task.completed && <Check size={14} />}
          </button>

          <div className="task-details">
            <span className="task-title">{task.title}</span>
            <div className="task-meta">
              <span className="subject-tag">{task.subject}</span>
              <span className="date-tag"><Calendar size={12} /> {task.dueDate}</span>
              <span className={`priority-tag p-${task.priority.toLowerCase()}`}>
                <AlertCircle size={12} /> {task.priority}
              </span>
            </div>
          </div>

          <button
            className="delete-btn"
            onClick={() => deleteTask(task.id)}
            title="Delete Task"
          >
            <Trash2 size={16} />
          </button>
        </li>
      ))}
    </ul>
  );
}
