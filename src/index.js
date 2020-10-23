import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { createStore,applyMiddleware,compose, combineReducers} from 'redux';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';


/* IMPORT REDUCERS */
import authReducer from './Store/reducer/auth'
import addProjReducer from './Store/reducer/addProject'


/* INIT  */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const rootReducer = combineReducers({
    auth:authReducer,
    addProj:addProjReducer
})
const Store = createStore( rootReducer , composeEnhancers ( applyMiddleware (thunk) ) );

/* SETUP APP CONST */
const app = (
    <Provider store={Store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
