import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import Main from './MainApp';
ReactDOM.render(<BrowserRouter
    basename={'/'}
    location={window.location}
    key = {window.location.pathname}
>
    <Main  />
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
