import {
    IMAGE_LOADING,
    IMAGE_LOADED_SUCCESS,
    IMAGE_LOAD_ERROR
} from '../Actions/ActionTypes'
import initialState from '../initialState'

function ImageReducer(state = initialState.image, action) {
	console.log(state)
    switch (action.type) {
        case IMAGE_LOADING:
            return {...state, imgLoading:action.imgLoading}    	
        case IMAGE_LOADED_SUCCESS:
            return {...state, imgLoading:action.imgLoading}
        case IMAGE_LOAD_ERROR:
            return {...state, imgLoadError:action.error}
        default:
			return state;
    }
}
export default ImageReducer;