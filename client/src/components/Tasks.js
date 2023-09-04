import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function Tasks({ tasks, setTasks }) {
  const location = useLocation(); 

 const handleStatusClick = (taskId) => {
    let updatedTasks = tasks.map((task) => {
      if (task.id === taskId){
        return {...task, status: !task.status}
      };
      return task;
    });
    setTasks(updatedTasks)
  }

  function taskStatus(status){
    const displayStatus = status ===true? "Completed" : "Not Started"
    return displayStatus
  }

  const convertedDates = tasks.map(obj => ({ ...obj, date: new Date(obj.date) }));
  const sortedDates = convertedDates.sort((a, b) => b.date - a.date);

  const handleDeleteClick = (taskId) => {
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      const updatedTasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
      setTasks(updatedTasks);
    }
  };

  return (
    <div className="task_page">
      {location.pathname === '/tasks' && <h1>Task List</h1>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
              <strong>Task:</strong> {task.task}<br />
            <strong>Due Date:</strong> {task.date}<br />
            <strong>Assignee:</strong> {task.assignee}<br />
            <strong>Space:</strong> {task.space}<br />
            <strong>Status:</strong> {taskStatus(task.status)}
            <button onClick={() => handleStatusClick(task.id)}>
              Mark as Completed
            </button>
            <button onClick={() => handleDeleteClick(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;