import {
    modalConstants
} from '../Actions/ActionTypes'


function ModalReducer(state = {}, action) {
    switch (action.type) {
        case modalConstants.MODAL_SUCCESS:
            return {...state, ids:action.ids, modalTitle:action.modalTitle, modalMessage:action.modalMessage};
        case modalConstants.MODAL_ERROR:
            return {...state, modalMessage:action.error};
        case modalConstants.MODAL_CLEAR:
            return {};
        default:
			return state;
    }
}
export default ModalReducer;
