import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import categoryReducer from './store/reducers/category';
import channelReducer from './store/reducers/channel';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;


const rootReducer = combineReducers({
    category: categoryReducer,
    channel: channelReducer
});

const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>    
)
ReactDOM.render(app, document.getElementById('root'));


serviceWorker.unregister();
