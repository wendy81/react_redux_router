import {
    userConstants
} from '../Actions/ActionTypes'

const initialState = {

}
function RegisterReducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.REGISTER_REQUEST:
            return {...state, user:action.user};
        case userConstants.REGISTER_SUCCESS:
            return {...state,user:action.user, message:action.message};
        case userConstants.REGISTER_FAILURE:
            return {...state,message:action.error};
        default:
			return state;
    }
}
export default RegisterReducer;