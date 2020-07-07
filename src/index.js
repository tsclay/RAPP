import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HelloMessage from './components/HelloMessage';
import PersonForm from './components/PersonForm'

ReactDOM.render(
  <React.StrictMode>
    <HelloMessage />
    <PersonForm/>
  </React.StrictMode>,
  document.getElementById('root')
);

