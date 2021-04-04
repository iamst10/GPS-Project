import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.css';
import './css/Button.css';
import './css/Nav.css';
import './css/Menu.css';
import './css/W3.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />,  document.getElementById('root'));

registerServiceWorker();
