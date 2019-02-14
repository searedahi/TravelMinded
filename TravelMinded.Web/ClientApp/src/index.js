import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore, { history } from './configureStore';
//import registerServiceWorker from './registerServiceWorker';

const store = configureStore()

const render = () => {
    ReactDOM.render(
            <Provider store={store}>
            <App history={history} />
                document.getElementById('root')
            </Provider>
    )
}

render()
//registerServiceWorker();
