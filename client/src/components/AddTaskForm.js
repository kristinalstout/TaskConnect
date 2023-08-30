import React, { useState } from "react";

function AddTaskForm({ isOpen, onClose, onAddTask }) {
  const [task, setTask] = useState("");

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTask(task);
    setTask("");
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Task:
            <input type="text" value={task} onChange={handleTaskChange} />
          </label>
          <button type="submit">Add Task</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AddTaskForm;
