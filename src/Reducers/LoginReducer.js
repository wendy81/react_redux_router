import {
    userConstants
} from '../Actions/ActionTypes'

// let user = JSON.parse(localStorage.getItem('user'));
// const initialState = user ? { user,  loggedIn: true } : { user: { username:'', password:''},  submitted:false};

export function LoginReducer(state = {}, action) {
    
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            console.log(userConstants.LOGIN_REQUEST)
            return {...state, user:{username: action.user}};
        case userConstants.LOGIN_SUCCESS:
            console.log(userConstants.LOGIN_SUCCESS)
            return {...state, user:action.user, loggedIn: true};
        case userConstants.LOGIN_FAILURE:
            return {...state,error:action.error};
        default:
			return state;
    }
}
export function LogoutReducer(state = {}, action) {
    
    switch (action.type) {
        case userConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}
