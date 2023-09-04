import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Switch, Route, Link, useLocation, useHistory } from 'react-router-dom';
import AddTaskForm from './AddTaskForm';
import Tasks from './Tasks';
import Calendar from './Calendar';
import { nanoid } from 'nanoid';
import NotesList from './NotesList';

function App() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [invitedEmail, setInvitedEmail] = useState('');
  const [isInvitationSent, setIsInvitationSent] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // toggle light/dark mode
  const [searchQuery] = useState('');
  const location = useLocation();
 
  // Initialize the 'notes' state variable
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: 'This is my first note!',
      date: '15/04/2021',
    },
    {
      id: nanoid(),
      text: 'This is my second note!',
      date: '21/04/2021',
    },
    {
      id: nanoid(),
      text: 'This is my third note!',
      date: '28/04/2021',
    },
    {
      id: nanoid(),
      text: 'This is my new note!',
      date: '30/04/2021',
    },
  ]);


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
  


//notes functionality
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString(),
    };
    const newNotes = [...notes, newNote];
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };


  //dark mode
  const handleToggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !darkMode);
  };


  return (
    <div className={`container-fluid ${darkMode ? 'dark-mode' : ''}`}>
      <div className="row">
        <div className="col-md-3 left-column">
          {/* Left column content */}
          <Link to="/" className="task-connect-link">
            <h1 className="task-connect-title">TaskConnect</h1>
          </Link>
          {/* left search bar */}
          <div className="search-bar">
            <nav className="navbar" >
              <div className="container-fluid">
                <form className="d-flex" role="search">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                </form>
              </div>
            </nav>
            <div className="black-line-1"></div>
            <div className="black-line-2"></div>
            {/* Groups checkbox */}
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
            {/* spaces checkbox */}
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

            {/* Modes button */}
             <button
              type="button"
              className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-secondary'}`}
              style={{ marginLeft: '10px' }}
              onClick={handleToggleDarkMode}
            >
              Toggle Modes
            </button>
          </div>
        </div>

       {/* Right column content */}
       <div className="col-md-9">
        {/* Navbar code */}
          <nav className={`navbar navbar-expand-lg ${darkMode ? 'bg-dark text-light' : 'bg-body-tertiary'}`}>
            <div className={`container-fluid ${darkMode ? 'dark-mode' : ''}`}>
              <Link to="/" className="navbar-brand">
                <span className={darkMode ? 'text-light' : ''}>Welcome!</span>
              </Link>

      <button
        className={`navbar-toggler ${darkMode ? 'text-light' : ''}`}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className={`navbar-toggler-icon ${darkMode ? 'text-light' : ''}`}></span>
      </button>
      <div className={`collapse navbar-collapse ${darkMode ? 'text-light' : ''}`} id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
  <li className="nav-item">
    <Link to="/tasks" className={`nav-link ${darkMode ? 'text-light' : ''}`} >
      Tasks
    </Link>
  </li>
  <li className="nav-item">
    <Link to="/notes" className={`nav-link ${darkMode ? 'text-light' : ''}`} >
      Notes
    </Link>

  </li>
</ul>
          <li className="nav-item">
          <Link to="/calendar" className={`nav-link ${darkMode ? 'text-light' : ''}`} >
      Calendar
    </Link>
          </li>
        </ul>
        <button
          type="button"
          className={`btn btn-outline-info ${darkMode ? 'text-light' : ''}`}
          onClick={() => setIsAddTaskOpen(true)}
        >
          {location.pathname === '/notes' ? 'Add Note' : 'Add Task'}
        </button>
        <button type="button" className={`btn btn-outline-warning ${darkMode ? 'text-light' : ''}`} onClick={handleInviteClick} style={{ marginLeft: '10px' }}>
          Invite +
        </button>
        {/* Invitation Popup */}
        {isInviteOpen && (
          <div className={`invite-popup ${darkMode ? 'dark-mode' : ''}`}>
            <h3>Invite a Friend</h3>
            <input
              type="email"
              placeholder="Enter email"
              value={invitedEmail}
              onChange={(e) => setInvitedEmail(e.target.value)}
            />
            <button
              type="button"
              className={`btn btn-primary ${darkMode ? 'btn-dark' : ''}`}
              onClick={handleInviteSubmit}
            >
              Send Invitation
            </button>
            <button
              type="button"
              className={`btn btn-secondary ${darkMode ? 'btn-dark' : ''}`}
              onClick={() => setIsInviteOpen(false)}
            >
              Cancel
            </button>
          </div>
        )}
        {/* Invitation Sent Popup */}
        {isInvitationSent && (
          <div className={`invite-popup ${darkMode ? 'dark-mode' : ''}`}>
            <h3>On The Way! 📬</h3>
            <p>Your invitation has been successfully sent!</p>
            <button
              type="button"
              className={`btn btn-secondary ${darkMode ? 'btn-dark' : ''}`}
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
  <nav className={`navbar ${darkMode ? 'bg-dark' : 'bg-body-tertiary'}`}>
    <div className="container-fluid">
      <form className="d-flex" role="search">
        <input className={`form-control me-2 ${darkMode ? 'text-light' : ''}`} type="search" placeholder="Type to Search..." aria-label="Search" />
        <button className={`btn btn-outline-success ${darkMode ? 'text-light' : ''}`} type="submit">
          Search
        </button>
      </form>
    </div>
  </nav>


  

          {/* Routing */}
          <AddTaskForm
            isOpen={isAddTaskOpen}
            onClose={() => setIsAddTaskOpen(false)}
            setTasks={setTasks} // Pass setTasks function
          />
        <Switch>
          <Route path="/tasks">
            <Tasks tasks={tasks} setTasks={setTasks} />
          </Route>
          <Route path="/notes">
          <NotesList
            notes={notes.filter((note) => note.text.toLowerCase().includes(searchQuery))}
            handleAddNote={addNote}
            handleDeleteNote={deleteNote}
            searchQuery={searchQuery}
          />
          </Route>
          <Route path="/calendar">
            <Calendar tasks={tasks} searchQuery={searchQuery} darkMode={darkMode} />
          </Route>
        </Switch>

        </div>
      </div>
    </div>
  );
}

export default App;
