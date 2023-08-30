import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'jquery/dist/jquery.slim.min.js'; // Import jQuery
import 'popper.js/dist/umd/popper.min.js'; // Import Popper.js
import 'bootstrap/dist/js/bootstrap.min.js'; // Import Bootstrap JS
import AddTaskForm from './AddTaskForm';
function App() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [tasks, setTasks] = useState([]);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
    setIsAddTaskOpen(false); // Close the popup form after adding task
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 left-column">
          {/* Left column content */}
          <h1 className="task-connect-title">TaskConnect</h1>
  <div className="search-bar">
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        </form>
      </div>
    </nav>
    <div className="black-line-1"></div>
    <div className="black-line-2"></div>
    <div className="checkbox-section">
      <h4 className="group-header">Groups</h4>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="goblinsCheckbox" style={{ borderColor: 'green' }} />
        <label className="form-check-label" htmlFor="goblinsCheckbox">
          Goblins
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="familyCheckbox" style={{ borderColor: 'blue' }} />
        <label className="form-check-label" htmlFor="familyCheckbox">
          Family
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="friendsCheckbox" style={{ borderColor: 'red' }} />
        <label className="form-check-label" htmlFor="friendsCheckbox">
          Friends
        </label>
      </div>
    </div>
    <div className="black-line-3"></div>
    <div className="checkbox-section">
      <h4 className="group-header">Spaces</h4>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="workCheckbox" style={{ borderColor: 'black' }} />
        <label className="form-check-label" htmlFor="workCheckbox">
          Work
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="schoolCheckbox" style={{ borderColor: 'purple' }} />
        <label className="form-check-label" htmlFor="schoolCheckbox">
          School
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="homeCheckbox" style={{ borderColor: 'yellow' }} />
        <label className="form-check-label" htmlFor="homeCheckbox">
          Home
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="socialCheckbox" style={{ borderColor: 'turquoise' }} />
        <label className="form-check-label" htmlFor="socialCheckbox">
          Social
        </label>
      </div>
    </div>
    <div className="black-line-4"></div>
    {isLoginFormOpen ? (
              <div>
                <div className="mb-3">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                  <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" />
                </div>
                <div className="mb-3">
                  <label htmlFor="inputPassword" className="col-form-label">Password</label>
                  <input type="password" className="form-control" id="inputPassword" />
                </div>
                <button type="button" className="btn btn-primary">Sign in</button>
              </div>
            ) : (
              <div>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => setIsLoginFormOpen(true)}
                >
                  PROFILE
                </button>
        <button type="button" className="btn btn-outline-secondary" style={{ marginLeft: '10px' }}>SETTINGS</button>
      </div>
    )}
  </div>
</div>

        <div className="col-md-9"> {/* 80% width column */}
          {/* Navbar code */}
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">School |</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">Tasks |</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"> Notes |</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"> Calendar |</a>
                  </li>
                </ul>
                <button type="button" className="btn btn-outline-info" onClick={() => setIsAddTaskOpen(true)}>Add Task</button>
                <span className="navbar-text">
                  | Invite +
                </span>
              </div>
            </div>
          </nav>
          {/* Search form */}
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search Tasks" aria-label="Search" />
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form>
        </div>
      </nav>
          {/* Rest of your content */}
          <AddTaskForm isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} onAddTask={handleAddTask} />
          <div className="task-list">
            <h2>Tasks</h2>
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
