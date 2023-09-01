import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.slim.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom';
import AddTaskForm from './AddTaskForm';
import Notes from './Notes';
import Tasks from './Tasks';
import Calendar from './Calendar';
import { nanoid } from 'nanoid';
import NotesList from './NotesList';
import AddNote from './AddNote';

function App() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [isLoginFormOpen, setIsLoginFormOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [invitedEmail, setInvitedEmail] = useState('');
  const [isInvitationSent, setIsInvitationSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInMessage, setLoggedInMessage] = useState('Welcome! Please Login');
  const [isOnTasksRoute, setIsOnTasksRoute] = useState(true);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  // const [darkMode, SetDarkMode] = useState(false);

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

  const location = useLocation(); // Get the current route location

  const [darkMode, setDarkMode] = useState(false); // toggle light/dark mode

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

  const formSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {},
  });

  const handleLoginSubmit = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = e.target.elements;

      const fetchData = async () => {
        const response = await fetch('/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        if (response.status === 200) {
          const data = await response.json();
          if (email === data.email && password === data.password) {
            localStorage.setItem('username', data.name); // Sets the username in local storage
            setIsLoggedIn(true);
            // Sets the loggedInMessage state variable to the user's name
            const loggedInMessage = `Hi, ${data.name}`;
            setLoggedInMessage(loggedInMessage);
          }
          return data;
        } else {
          throw new Error(response.statusText);
        }
      };

      await fetchData();
    } catch (error) {
      // Handle error
    }
  };

  // Function to handle clicking on the "Tasks" link
  const handleTasksLinkClick = () => {
    setIsOnTasksRoute(true);
  };

  // Function to handle clicking on the "Notes" link
  const handleNotesLinkClick = () => {
    setIsOnTasksRoute(false);
  };

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data'));

    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('react-notes-app-data', JSON.stringify(notes));
  }, [notes]);

 

  const [searchText, setSearchText] = useState('');

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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 left-column">
          {/* Left column content */}
          <Link to="/" className="task-connect-link">
            <h1 className="task-connect-title">TaskConnect</h1>
          </Link>
          {/* left search bar */}
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
            {/* Login form */}
            {isLoginFormOpen ? (
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                  {formik.errors.email && <p className="text-danger">{formik.errors.email}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="col-form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.errors.password && <p className="text-danger">{formik.errors.password}</p>}
                </div>
                <button type="submit" className="btn btn-primary">
                  Sign in
                </button>
              </form>
            ) : (
              <div>
                <button
                  type="button"
                  className="btn btn-outline-primary"
                  onClick={() => setIsLoginFormOpen(true)}
                >
                  PROFILE
                </button>
              </div>
            )}

            {/* Modes button */}
            <button type="button" className="btn btn-outline-secondary" style={{ marginLeft: '10px' }}>
              Toggle Modes
            </button>
          </div>
        </div>

        {/* Right column content */}
        <div className="col-md-9">
          {/* Navbar code */}
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand">
                {isLoggedIn ? `Hi, ${localStorage.getItem('username')}` : 'Welcome! Please Login'}
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/tasks" className="nav-link" aria-current="page">
                      Tasks |
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/notes" className="nav-link">
                      Notes |
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/calendar" className="nav-link">
                      Calendar |
                    </Link>
                  </li>
                </ul>
                <button
                  type="button"
                  className="btn btn-outline-info"
                  onClick={() => setIsAddTaskOpen(true)}
                >
                  {location.pathname === '/notes' ? 'Add Note' : 'Add Task'}
                </button>
                <button type="button" className="btn btn-outline-warning" onClick={handleInviteClick} style={{ marginLeft: '10px' }}>
                  Invite +
                </button>
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
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            </div>
          </nav>
          {/* Render notes */}
          <div className="notes-list">
            {notes.map((note) => (
              <Notes key={note.id} id={note.id} text={note.text} date={note.date} handleDeleteNote={deleteNote} />
            ))}
          </div>
          {/* Routing */}
          <AddTaskForm isOpen={isAddTaskOpen} onClose={() => setIsAddTaskOpen(false)} onAddTask={handleAddTask} />
          <Switch>
            <Route path="/tasks">
              <Tasks tasks={tasks} />
            </Route>
            <Route path="/notes">
              {/* You should pass appropriate props to the Notes component */}
              <NotesList notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))} handleAddNote={addNote} handleDeleteNote={deleteNote} />
            </Route>
            <Route path="/calendar">
              <Calendar tasks={tasks} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}

export default App;
