import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './style.css';
import {BrowserRouter} from "react-router-dom";
import {createRoot} from "react-dom/client"

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Bootstrap JS dependencies
import 'jquery/dist/jquery.slim.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter>
    <App/>
    </BrowserRouter>
);
// ReactDOM.render(<App />, document.getElementById('root'));

