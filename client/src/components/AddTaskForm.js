import React, { useState } from "react";

function AddTaskForm({ isOpen, onClose, onAddTask }) {
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleTaskChange = (event) => {
    setTask(event.target.value);
  };

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddTask({ task, dueDate: new Date(dueDate).toISOString() }); // Convert to ISO string
    setTask("");
    setDueDate("");
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
          <label>
            Due Date:
            <input type="date" value={dueDate} onChange={handleDueDateChange} />
          </label>
          <button type="submit">Add Task</button>
        </form>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AddTaskForm;