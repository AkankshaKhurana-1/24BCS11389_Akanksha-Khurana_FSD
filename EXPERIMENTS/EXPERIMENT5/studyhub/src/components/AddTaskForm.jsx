import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { useStudent } from '../context/StudentContext';

export default function AddTaskForm() {
  const { addTask } = useStudent();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      subject: subject.trim() || 'General',
      priority,
      dueDate: dueDate || new Date().toISOString().split('T')[0]
    });

    setTitle('');
    setSubject('');
    setPriority('Medium');
    setDueDate('');
  };

  return (
    <form className="add-task-card" onSubmit={handleSubmit}>
      <h4>Add New Study Task</h4>
      <div className="form-grid">
        <input
          type="text"
          placeholder="Task title (e.g. Read Chapter 4)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          required
        />
        <input
          type="text"
          placeholder="Subject / Course"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="form-input"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="form-select"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="form-input"
        />
      </div>
      <button type="submit" className="add-btn">
        <PlusCircle size={18} />
        <span>Add Task</span>
      </button>
    </form>
  );
}
