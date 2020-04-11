import React from 'react';
import ReactDOM from 'react-dom';
//Importing react and reactdom libraries

import { BrowserRouter as Router, Route } from 'react-router-dom'
//Import Router and Route. Why the curly braces? this is a named import.

//import './index.css';     

import App from './App.js';
//import the component exported as App from App.js


ReactDOM.render(
        <Router>
            <Route path = "/" component={App} />  
            { /*Curly braces are required to evaluate JS code within JSX tags 
            This sets up the default route if anyone visits the hosted website.*/}
        </Router>
        , document.getElementById('root') 
    );
    //This renders the element created by router on root as defined in index.html

