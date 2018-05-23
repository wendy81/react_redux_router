import {
    DATA_FETCH_BEGIN,
    DATA_FETCH_FAILURE,
    LIST_DATA_FETCH_SUCCESS
} from '../Actions/ActionTypes'
import initialState from '../initialState'

function ListReducer(state = initialState, action) {
    switch (action.type) {
        case DATA_FETCH_BEGIN:
            return {...state, loading:action.loading, status:action.status}    	
        case LIST_DATA_FETCH_SUCCESS:
            return {...state, lists:action.data,loading:action.loading, status:action.status}            
        case DATA_FETCH_FAILURE:
            return {...state, loading:action.loading, status:action.status, error:action.error}
        default:
			return state;
    }
}
export default ListReducer;