import {
    DATA_FETCH_BEGIN,
    DATA_FETCH_FAILURE,
    FEATURED_DATA_FETCH_SUCCESS
} from '../Actions/ActionTypes'
import initialState from '../initialState'

function HomeReducer(state = initialState, action) {
    switch (action.type) {
        case DATA_FETCH_BEGIN:
            return {...state, loading:action.loading, status:action.status}    	
        case FEATURED_DATA_FETCH_SUCCESS:
            return {...state, featured:action.data,loading:action.loading, status:action.status}
        case DATA_FETCH_FAILURE:
            return {...state, loading:action.loading, status:action.status, error:action.error}
        default:
			return state;
    }
}
export default HomeReducer;