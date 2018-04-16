import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'jquery';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

document.title = "Auction Chain"

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();