import React, { useState } from "react";
import { Formik, Field, Form } from "formik";

function AddTaskForm({ isOpen, onClose, setTasks }) {
  const initialValues = {
    task: "",
    dueDate: "",
    assignee: "",
    selectedSpace: "",
  };

  const availableUsers = ["Kristina", "Amir", "Matthew"];
  const spaces = ["Work", "School", "Home", "Social"];

  const handleAddTask = async (newTask) => {
    try {
      const response = await fetch("/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const responseData = await response.json();
      // Update tasks in the parent component
      setTasks((prevTasks) => [...prevTasks, responseData]);
      onClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Add Task</h2>
        <Formik initialValues={initialValues} onSubmit={handleAddTask}>
          <Form>
            <div className="form-group">
              <label htmlFor="task">Task:</label>
              <Field type="text" id="task" name="task" />
            </div>
            <div className="form-group">
              <label htmlFor="dueDate">Due Date:</label>
              <Field type="date" id="dueDate" name="dueDate" />
            </div>
            <div className="form-group">
              <label htmlFor="assignee">Assignees:</label>
              <Field as="select" id="assignee" name="assignee">
                <option value="">Select Assignee</option>
                {availableUsers.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
              </Field>
            </div>
            <div className="form-group">
              <label htmlFor="selectedSpace">Space:</label>
              <Field as="select" id="selectedSpace" name="selectedSpace">
                <option value="">Select Space</option>
                {spaces.map((space) => (
                  <option key={space} value={space}>
                    {space}
                  </option>
                ))}
              </Field>
            </div>
            <button type="submit">Add Task</button>
          </Form>
        </Formik>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default AddTaskForm;
