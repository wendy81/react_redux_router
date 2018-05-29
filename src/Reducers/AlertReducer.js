import {
    alertConstants
} from '../Actions/ActionTypes'


function AlertReducer(state = {}, action) {
    switch (action.type) {
        case alertConstants.SUCCESS:
            return {type:"success", message:action.message};
        case alertConstants.ERROR:
            return {type:"danger",message:action.error};
        case alertConstants.CLEAR:
            return {};
        default:
			return state;
    }
}
export default AlertReducer;