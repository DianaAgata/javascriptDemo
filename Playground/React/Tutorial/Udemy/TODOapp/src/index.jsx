import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import getStore from './getStore';
import { Provider } from 'react-redux';
import main from './main.css';

ReactDOM.render(
    <div>
        <Provider store={getStore()}>
            <App/>
        </Provider>
    </div>,
    document.getElementById('app')
);
