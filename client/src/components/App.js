import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'jquery/dist/jquery.slim.min.js'; // Import jQuery
import 'popper.js/dist/umd/popper.min.js'; // Import Popper.js
import 'bootstrap/dist/js/bootstrap.min.js'; // Import Bootstrap JS
import AddTaskForm from './AddTaskForm';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Notes from "./Notes";
import Tasks from "./Tasks";
import Calendar from "./Calendar";

function App() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [invitedEmail, setInvitedEmail] = useState('');
  const [isInvitationSent, setIsInvitationSent] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setIsAddTaskOpen(false);
  };

  const handleInviteSubmit = () => {
    setInvitedEmail('');
    setIsInvitationSent(true);
    setIsInviteOpen(false);
  };

  const handleInviteClick = () => {
    setIsInviteOpen(true);
    setIsInvitationSent(false); 
  };

  const handleGroupClick = (group) => {
    if (selectedGroups.includes(group)) {
      setSelectedGroups(selectedGroups.filter(item => item !== group));
    } else {
      setSelectedGroups([...selectedGroups, group]);
    }
  }

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 left-column">
          {/* Left column content */}
          <Link to="/" className="task-connect-link">
            <h1 className="task-connect-title">TaskConnect</h1>
          </Link> 
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
        <input className="form-check-input" type="checkbox" value="" id="goblinsCheckbox" style={{ borderColor: 'green' }} onChange={() => handleGroupClick('goblins')}/>
        <label className="form-check-label" htmlFor="goblinsCheckbox">
          Goblins
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="familyCheckbox" style={{ borderColor: 'blue' }} onChange={() => handleGroupClick('family')}/>
        <label className="form-check-label" htmlFor="familyCheckbox">
          Family
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="friendsCheckbox" style={{ borderColor: 'red' }} onChange={() => handleGroupClick('friends')}/>
        <label className="form-check-label" htmlFor="friendsCheckbox">
          Friends
        </label>
      </div>
    </div>
    <div className="black-line-3"></div>
    <div className="checkbox-section">
      <h4 className="group-header">Spaces</h4>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="workCheckbox" style={{ borderColor: 'black' }}  onChange={() => handleGroupClick('work')} />
        <label className="form-check-label" htmlFor="workCheckbox">
          Work
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="schoolCheckbox" style={{ borderColor: 'purple' }}  onChange={() => handleGroupClick('school')} />
        <label className="form-check-label" htmlFor="schoolCheckbox">
          School
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="homeCheckbox" style={{ borderColor: 'yellow' }}  onChange={() => handleGroupClick('home')}/>
        <label className="form-check-label" htmlFor="homeCheckbox">
          Home
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="checkbox" value="" id="socialCheckbox" style={{ borderColor: 'turquoise' }}  onChange={() => handleGroupClick('social')}/>
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
                    <Link to="/tasks" className="nav-link" aria-current="page">Tasks |</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/notes" className="nav-link"> Notes |</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/calendar" className="nav-link"> Calendar |</Link>
                  </li>
                </ul>
                
                <button type="button" className="btn btn-outline-info" onClick={() => setIsAddTaskOpen(true)}>Add Task</button>
                <button type="button" className="btn btn-outline-warning" onClick={handleInviteClick } style={{ marginLeft: '10px' }}>Invite +</button>
                {/* Invitation Popup */}
                {isInviteOpen && (
                  <div className="invite-popup">
                    <h3>Invite a Friend</h3>
                    <input
                      type="email"
                      placeholder="Enter email"
                      value={invitedEmail}
                      onChange={(e) => setInvitedEmail(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleInviteSubmit}
                    >
                      Send Invitation
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsInviteOpen(false)}
                    >
                      Cancel
                    </button>
                </div>
                )}
                {/* Invitation Sent Popup */}
                {isInvitationSent && (
                  <div className="invite-popup">
                    <h3>On The Way! 📬</h3>
                    <p>Your invitation has been successfully sent!</p>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setIsInvitationSent(false)}
                    >
                      Close
                    </button>
                  </div>
                )}
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
          {/* Routing */}
          <AddTaskForm isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} onAddTask={handleAddTask} />
          <Switch>
            <Route path="/tasks">
              <Tasks tasks={tasks.filter(task => selectedGroups.includes(task.group))} setTasks = {setTasks} />
            </Route>
            <Route path="/notes">
              <Notes />
            </Route>
            <Route path="/calendar">
              <Calendar tasks={tasks} />
            </Route>
          </Switch>
            {/*  */}
        </div>
      </div>
    </div>
  );
}

export default App;
