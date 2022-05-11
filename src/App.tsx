import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { Button } from 'antd';
import './App.css';
import {getUser} from './API/users';
function App() {
  async function gg(){
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkMDYzZGQwZC1hNzk1LTRlYTMtOWI4YS01ZDRkNDE1MTFhMzIiLCJsb2dpbiI6InRlc3Rsb2dpbjEiLCJpYXQiOjE2NTIyNzc2MjJ9.dZTLA0hOySB_-h18XtGZXx9-oAspRh74DKm6_yhHPcs";
    console.log(await getUser(token));
  }
  gg();
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button type="primary">Button</Button>
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
