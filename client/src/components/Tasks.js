import React, { useState } from 'react';

function Tasks({tasks}){
  //note to self, need to add status to backend column. Also need to add group property
  const handleStatusClick = (taskId) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status: 'completed' };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

    return(
        <div className="task_page" >
      <h1>Task List</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => handleStatusClick(task.id)}>
              Mark as Completed
            </button>
          </li>
        ))}
      </ul>
    </div>
    )
}

export default Tasks;



/* <div className="task-list">
            <h2>Tasks</h2>
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div> */