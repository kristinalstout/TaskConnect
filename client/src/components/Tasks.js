import React, { useState } from 'react';

function Tasks({tasks, setTasks}){
  
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

    return(
        <div className="task_page" >
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.task} - {taskStatus(task.status)} 
            <button onClick={() => handleStatusClick(task.id)}>
              Mark as Completed
            </button>
          </li>
        ))}
      </ul>
    </div>
    )
}

// onClick={() => handleStatusClick(task.id)}
export default Tasks;