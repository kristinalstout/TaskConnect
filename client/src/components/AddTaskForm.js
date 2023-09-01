import React, { useState, useEffect } from "react";

function AddTaskForm({ isOpen, onClose, onAddTask }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignee, setAssignee] = useState("");
  // const [users, setUsers] = useState(["go fuck yourself React"]);


  // useEffect(() => {
  //   const watchMeFail = async () => {
  //     const response = await fetch("http://localhost/users");
  //     const userArr = await response.json();
  //     // setUsers(userArr);
  //     console.log(userArr)
  //   };
  //   watchMeFail().catch(console.error);
  //   setUsers(users=>("apples"))
  // }, []);

 

  // console.log(users)

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleAssigneeChange = (event) => {
    setAssignee(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newTask = {
      task,
      dueDate,
      assignee
    }
    fetch("/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Accept:"application/json"
      },
      body: JSON.stringify(newTask),
    })
    .then(response=>{if (!response.ok){
      throw new Error(response.statusText);} 
      return response.json();})
    .catch(error=>{console.error('Error:', error);});
  }


  if (!isOpen) {
    return null;
  }
  const availableUsers = ["Kristina","Amir","Matthew"]
  
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Task:
            <input type="text" value={task} onChange={handleTaskChange} />
          </label>
          <label>
            Due Date:
            <input type="date" value={dueDate} onChange={handleDueDateChange} />
          </label>
          <label>
            Assignees:
            <select value={assignee} onChange={handleAssigneeChange}>
              <option value="">Select Assignee</option>
              {availableUsers.map((user)=>(
                <option key ={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </label>
          <button type="submit">Add Task</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AddTaskForm;