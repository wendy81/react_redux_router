
import { configureFakeBackend } from '../Fake/backend';
import { authHeader } from '../Components/AuthHeader';

configureFakeBackend();

function Register(user) {
    const requestOptions = {
    	method:'POST',
    	headers: { 'Content-Type': 'application/json' },
    	body: JSON.stringify(user)
    }
    return fetch('/users/register', requestOptions).then(handleResponse);
}

function Login(username, password) {
    const requestOptions = {
    	method:'POST',
    	headers: { 'Content-Type': 'application/json' },
    	body: JSON.stringify({username, password})
    }
    return fetch('/users/authenticate', requestOptions).then(handleResponse).then ( user => {
    	if( user.username && user.token ) {
    		localStorage.setItem('user', JSON.stringify(user));
    	}
    	return user
    });
}

function Logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function GetAll() {
    const requestOptions = {
        method:'GET',
        headers: authHeader(),
    }
    return fetch('/lists', requestOptions).then(handleResponse)
}


function DelList(id, userId) {
    const requestOptions = {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id, userId})
    }
    return fetch('/delList', requestOptions).then(handleResponse); 
}

function EditList(id, userId, textContent) {
    let authHeaderSet = authHeader();
    const requestOptions = {
        method:'POST',
        headers: { 'Content-Type': 'application/json', ...authHeaderSet },
        body: JSON.stringify({id, userId, textContent})
    }
    return fetch('/editList', requestOptions).then(function(response){
        console.log(response)
    }); 
}

function handleResponse(response) {
    if(!response.ok) {
        return Promise.reject(response.statusText)
    }
    return response.json()
}



export const userService = { Register, Login, GetAll, Logout, DelList, EditList };
