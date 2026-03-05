import * as Sentry from '@sentry/react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => { throw new Error("Sentry test error"); }}>
          Throw error
        </button>
        <button onClick={() => {
          const value = Math.floor(Math.random() * 1000) + 1;
          console.log("Sending metric to Sentry:", { name: "totalTimeInSeconds", value, unit: "second" });
          Sentry.metrics.distribution("totalTimeInSeconds", value, { unit: "second" });
        }}>
          Record metric
        </button>
      </header>
    </div>
  );
}

export default App;
