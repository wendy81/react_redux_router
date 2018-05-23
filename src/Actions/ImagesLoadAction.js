import {
    IMAGE_LOADING,
    IMAGE_LOADED_SUCCESS,
    IMAGE_LOAD_ERROR,

    makeActionCreator
} from './ActionTypes'

function ImagesLoadAction(ele) {
    return function(dispatch) {
        dispatch(makeActionCreator(IMAGE_LOADING, 'imgLoading')(false))
        ele.onLoad = () => {
            dispatch(makeActionCreator(IMAGE_LOADED_SUCCESS, 'imgLoading')(true))
        }
        ele.onError = (e) => {
            dispatch(makeActionCreator(IMAGE_LOAD_ERROR, 'imgLoadError')(e))
        }
    }
}


export default ImagesLoadAction;
