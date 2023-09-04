import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Tasks({ tasks, setTasks }) {
  const location = useLocation(); // Get the current route location

  const handleStatusClick = (taskId) => {
    // Your existing code for updating task status
  }

  function taskStatus(status) {
    // Your existing code for displaying task status
  }

  const convertedDates = tasks.map(obj => ({ ...obj, dueDate: new Date(obj.dueDate) }));
  const sortedDates = convertedDates.sort((a, b) => b.date - a.date);

  return (
    <div className="task_page">
      {location.pathname === '/tasks' && <h1>Task List</h1>} {/* Conditionally render the header */}
      <ul>
        {sortedDates.map((task) => (
          <li key={task.id}>
            {task.task} - {taskStatus(task.status)}
            <button onClick={() => handleStatusClick(task.id)}>
              Mark as Completed
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
