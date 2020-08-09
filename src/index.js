import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HelloMessage from './components/HelloMessage';
import PersonForm from './components/PersonForm'

// Change to not 'dev' when ready for production
// const ENV = "prod";

// API route that will change based on env setting
// Add to these as necessary
// let PEOPLE = '';

// if (ENV === 'dev') {
//   PEOPLE = "http://localhost:8888/people"
// } else {
//   PEOPLE = "/people";
// }

const PEOPLE = '/people'

// If adding extra API routes, make sure to pass them down as props
ReactDOM.render(
  <React.StrictMode>
    <HelloMessage />
    <PersonForm API_URL={PEOPLE}/>
  </React.StrictMode>,
  document.getElementById('root')
);

