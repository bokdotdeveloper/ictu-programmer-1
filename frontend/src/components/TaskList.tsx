import React from 'react';
import { deleteTask, updateTask } from '../utils/api';

const TaskList = ({ tasks, setTasks }) => {
  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  const toggleComplete = async (task) => {
    const updatedTask = await updateTask(task._id, { ...task, completed: !task.completed });
    setTasks((prev) => prev.map((t) => (t._id === task._id ? updatedTask : t)));
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <button onClick={() => toggleComplete(task)}>Toggle</button>
          <button onClick={() => handleDelete(task._id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;