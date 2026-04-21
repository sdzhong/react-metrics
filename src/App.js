import { useEffect, useRef } from 'react';
import * as Sentry from '@sentry/react';
import logo from './logo.svg';
import './App.css';

const toRoman = (num) => {
  const vals = [1000,900,500,400,100,90,50,40,10,9,5,4,1];
  const syms = ['m','cm','d','cd','c','xc','l','xl','x','ix','v','iv','i'];
  let result = '';
  for (let i = 0; i < vals.length; i++) {
    while (num >= vals[i]) { result += syms[i]; num -= vals[i]; }
  }
  return result;
};

function App() {
  const tagsRef = useRef(null);

  useEffect(() => {
    const tags = {
      'performance-tracking': String.fromCharCode(65 + Math.floor(Math.random() * 26)),
      trackingId: Math.floor(Math.random() * 10) + 1,
      user_email: Math.random().toString(36).substring(2, 7) + '@example.com',
      scope: toRoman(Math.floor(Math.random() * 1000) + 1),
    };
    Object.entries(tags).forEach(([k, v]) => Sentry.setTag(k, v));
    tagsRef.current = tags;
  }, []);

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
        <button onClick={() => {
          Sentry.captureException(new Error("Sentry test error"));
        }}>
          Throw error
        </button>
        <button onClick={() => {
          const value = Math.floor(Math.random() * 1000) + 1;
          console.log("Sending metric to Sentry:", { name: "totalTimeInSeconds", value, unit: "second", attributes: tagsRef.current });
          Sentry.metrics.distribution("totalTimeInSeconds", value, { unit: "second", attributes: tagsRef.current });
        }}>
          Record metric
        </button>
        <button onClick={() => {
          const value = Math.floor(Math.random() * 10001);
          const randStr = () => Math.random().toString(36).substring(2, 8);
          const path = `root.myRouter.video__tab.${randStr()}.${randStr()}`;
          console.log("Sending metric to Sentry:", { name: "my_paths", value, attributes: { path } });
          Sentry.metrics.distribution("my_paths", value, { attributes: { path } });
        }}>
          Record path metric
        </button>
      </header>
    </div>
  );
}

export default App;
