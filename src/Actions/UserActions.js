import {
    userConstants,
    alertConstants,
    modalConstants,
    makeActionCreator
} from './ActionTypes'

import { userService } from './UserServiceActions'

function Register(user,history) {
    return function(dispatch) {
        dispatch(makeActionCreator(userConstants.REGISTER_REQUEST, 'user')(user))
        userService.Register(user)
        .then( user => {
            dispatch(makeActionCreator(userConstants.REGISTER_SUCCESS, 'user')(user));
            history.push('/login');
            dispatch(makeActionCreator(alertConstants.SUCCESS)('Registration successful'));
        })
        .catch( error => {
            dispatch(makeActionCreator(userConstants.REGISTER_FAILURE,'error')(error));
            dispatch(makeActionCreator(alertConstants.ERROR,'error')(error));
        })
        AlertClear(dispatch);
    }
}

function Login(username, password, history) {

    return function(dispatch) {
        dispatch(makeActionCreator(userConstants.LOGIN_REQUEST, 'user')(username))
        userService.Login(username, password)
        .then( user => {
            dispatch(makeActionCreator(userConstants.LOGIN_SUCCESS, 'user')(user));
            history.push('/lists');
            dispatch(makeActionCreator(alertConstants.SUCCESS,'message')('Login successful'));
        })
        .catch( error => {
            dispatch(makeActionCreator(userConstants.LOGIN_FAILURE,'error')(error));
            dispatch(makeActionCreator(alertConstants.ERROR,'error')(error));
        })
        AlertClear(dispatch);      
    }

}

function GetAll(){
     return function(dispatch) {
        dispatch(makeActionCreator(userConstants.GETALL_REQUEST, 'message')('Request successfull'))
        userService.GetAll()
        .then( user => {
            dispatch(makeActionCreator(userConstants.GETALL_SUCCESS, 'users', 'user')(user.users, user.user));
            dispatch(makeActionCreator(alertConstants.SUCCESS,'message')('Get all datas successful'));
        })
        .catch( error => {
            dispatch(makeActionCreator(userConstants.GETALL_FAILURE,'error')(error));
            dispatch(makeActionCreator(alertConstants.ERROR,'error')(error));
        })
        AlertClear(dispatch);
    }   
}

function DelList(id, userId) {
     return function(dispatch) {
        dispatch(makeActionCreator(userConstants.DELETE_REQUEST, 'message')('Request successfull'))
        userService.DelList(id, userId)
        .then( user => {
            dispatch(makeActionCreator(userConstants.DELETE_SUCCESS, 'users')(user));
            dispatch(makeActionCreator(alertConstants.SUCCESS,'message')('Delete data successful'));
        })
        .catch( error => {
            dispatch(makeActionCreator(userConstants.DELETE_FAILURE,'error')(error));
            dispatch(makeActionCreator(alertConstants.ERROR,'error')(error));

        })
        AlertClear(dispatch);
    }   
}

function IsDelList(id, userId, textContent) {
     return function(dispatch) {
        dispatch(makeActionCreator(modalConstants.MODAL_SUCCESS, 'ids', 'modalTitle', 'modalMessage')({id,userId},'Delete User Info', 'Are You Sure Deltete User:' + textContent));
    }   
}

function EditList(id, userId, textContent) {
     return function(dispatch) {
        dispatch(makeActionCreator(userConstants.EDIT_REQUEST, 'message')('Request successfull'))
        userService.EditList(id, userId, textContent)
        .then( user => {
            dispatch(makeActionCreator(userConstants.EDIT_SUCCESS, 'usersAddUser')(user));
            dispatch(makeActionCreator(alertConstants.SUCCESS,'message')('Edit data successful'));
        })
        .catch( error => {
            console.log(error)
            dispatch(makeActionCreator(userConstants.EDIT_FAILURE,'error')(error));
            dispatch(makeActionCreator(alertConstants.ERROR,'error')(error));
        })
        AlertClear(dispatch);
    }   
}


function Logout(history) {
     return function(dispatch) {
        dispatch(makeActionCreator(userConstants.LOGOUT, 'message')('Exit successfull'))
        dispatch(makeActionCreator(alertConstants.SUCCESS,'message')('Exit successfull'));
        userService.Logout();
        history.push('/lists');
        AlertClear(dispatch);
    }   
}

function AlertClear(dispatch) {
     setTimeout( ()=> {
        dispatch(makeActionCreator(alertConstants.CLEAR)());
    }, 2000)   
}

export const UserActions = { Register, Login, GetAll, Logout, DelList, EditList, IsDelList };
