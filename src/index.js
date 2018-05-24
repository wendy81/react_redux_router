import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// import { Router, Route, browserHistory } from 'react-router'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

import HomeComponent from './Components/HomeComponent';
import ListComponent from './Components/ListComponent';
import DetailComponent from './Components/DetailComponent';
import ActorComponent from './Components/ActorComponent';


import HomeReducer from './Reducers/HomeReducer';
import ListReducer from './Reducers/ListReducer';
import ImageReducer from './Reducers/ImageReducer';


const rootReducer = combineReducers({
    HomeReducer,
    ListReducer,
    ImageReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));
// store.dispatch(GetDataAction());


class App extends React.Component {

	render(){
		return (
		<Provider store={store}>
			<BrowserRouter>
			<div>
				<Redirect to={{pathname: '/home'}} />
				<Route exact={true} path="/actor" component= {ActorComponent}  />
				<Route path="/" />
				<Route path="/list" component= {ListComponent} />
				<Route exact={true} path="/home" component= {HomeComponent}  />
				<Route exact={true} path="/detail"  component= {DetailComponent} />
			</div>
			</BrowserRouter>
		</Provider>
		)
	}
}

// App.propTypes = {
//   store: PropTypes.object.isRequired,
// }

store.subscribe(() => {
  // var state = store.getState();
  // console.log(state)
});


render(<App />, document.getElementById('root'))

