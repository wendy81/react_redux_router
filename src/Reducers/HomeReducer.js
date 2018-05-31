import {
    userConstants
} from '../Actions/ActionTypes'


function HomeReducer(state = {}, action) {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {...state, message:action.message};
        case userConstants.GETALL_SUCCESS:
            return {...state, users:action.users, user:action.user};
        case userConstants.GETALL_FAILURE:
            return {...state, error:action.error};
        default:
			return state;
    }
}
export default HomeReducer;