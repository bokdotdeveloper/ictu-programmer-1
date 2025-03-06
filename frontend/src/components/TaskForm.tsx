import React, { useState } from 'react';
import { createTask } from '../utils/api';

const TaskForm = ({ setTasks }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = await createTask({ title, completed: false });
    setTasks((prev) => [...prev, newTask]);
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;