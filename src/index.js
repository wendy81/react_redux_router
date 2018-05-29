import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

import { PrivateRoute } from './Components/PrivateRoute';

import { createForms } from 'react-redux-form';

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import RegisterComponent from './Components/RegisterComponent'
import LoginComponent from './Components/LoginComponent'
import HomeComponent from './Components/HomeComponent'

import AlertReducer from './Reducers/AlertReducer';
import RegisterReducer from './Reducers/RegisterReducer';
import { LoginReducer, LogoutReducer }  from './Reducers/LoginReducer';
import HomeReducer from './Reducers/HomeReducer'


const rootReducer = combineReducers({
    AlertReducer,
    RegisterReducer,
    LoginReducer,
    LogoutReducer,
    HomeReducer,
    ...createForms({
	    register: {username:'', password:'', confirmPassword:''},
	    login: {username:'', password:''},
    })
});

const store = createStore(rootReducer, applyMiddleware(thunk));

class App extends React.Component {
	render(){
		return (
		<Provider store={store}>
			<BrowserRouter>
			<div>
				<Route path="/register" component={RegisterComponent}/>
				<Route path="/login" component={LoginComponent}/>
				<PrivateRoute  path="/home" component={HomeComponent} />
			</div>
			</BrowserRouter>
		</Provider>
		)
	}
}

store.subscribe(() => {
  // var state = store.getState();
  // console.log(state)
});


render(<App />, document.getElementById('root'))

