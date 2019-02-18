import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import rootReducer from './reducers'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

const store = createStore(rootReducer, applyMiddleware(thunk))

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter basename={baseUrl}>
            <App />
        </BrowserRouter>
    </Provider>,
    rootElement);


registerServiceWorker();