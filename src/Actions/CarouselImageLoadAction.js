import {
    CAROUSEL_ITEMS_LOADING,
    CAROUSEL_ITEMS_LOAD_FINISH,
    CAROUSEL_ITEMS_LOAD_ERROR,
    ON_CAROUSEL_EXITING,
    ON_CAROUSEL_EXITED,
    ON_CAROUSEL_NEXT,
    ON_CAROUSEL_PREVIOUS,
    ON_CAROUSEL_GOTOINDEX,

    IMAGE_LOADING,
    IMAGE_LOADED_SUCCESS,
    IMAGE_LOAD_ERROR,
    ALL_IMAGES_LOADED_SUCCESS,

    makeActionCreator
} from './ActionTypes'


 function CarouselImageLoadAction() {
     return function(dispatch) {
         dispatch(makeActionCreator(CAROUSEL_ITEMS_LOADING)())
         fetch('/initialState.json').then(data => data.json()).then(json => {
            dispatch(makeActionCreator(CAROUSEL_ITEMS_LOAD_FINISH,"data")(json.items))
         }).catch((err) => {
            dispatch(makeActionCreator(CAROUSEL_ITEMS_LOAD_ERROR,"error")(err))
         })
     }
 }


function OnClickHandlerAction(isOnProps, ele, animating){
      return function(dispatch) {
        ele.onExiting = isOnProps.isOnExiting ? () => dispatch(makeActionCreator(ON_CAROUSEL_EXITING)()) : () => {};
        ele.onExited = isOnProps.isOnExited ? () => dispatch(makeActionCreator(ON_CAROUSEL_EXITED)()) : () => {};
        ele.next = isOnProps.isNext ? () => {if (animating) return; dispatch(makeActionCreator(ON_CAROUSEL_NEXT)()) } : () => {};
        ele.previous = isOnProps.isPrevious ? () => {if (animating) return; dispatch(makeActionCreator(ON_CAROUSEL_PREVIOUS)()) } : () => {};
        ele.goToIndex = isOnProps.isGoToIndex ? (newIndex) => dispatch(makeActionCreator(ON_CAROUSEL_GOTOINDEX,"index")(newIndex)) : () => {};       
     }   
 }


// function AllImageComplete(){
//     const imgElements = document.getElementsByTagName("img");

//     for( let i = 0; i < imgElements.length -1; i++) {
//     // for (const img of imgElements) {
//         if (!img.complete) {
//             return false;
//         }

//         if ( i === ) 
//     }
//     console.log("true")
//     return true;
// } 


function ImagesLoadAction(ele,parentNode) {
    return function(dispatch) {
        let num = 0;

        dispatch(makeActionCreator(IMAGE_LOADING, "imageLoadStatus")("Loading"))

        ele.onLoadBefore = () => {
            console.log("0000")
        }
        ele.onLoad = (len,index,e) => {
            console.log(e.target)
            console.log(e.target.complete)
            // if(e.target.complete) {
                // console.log(e.target.complete)
                num = num + 1;
                dispatch(makeActionCreator(IMAGE_LOADED_SUCCESS, "imageLoadStatus")("Loaded"))
            // }
            if(num === len) {
                // dispatch(makeActionCreator(ALL_IMAGES_LOADED_SUCCESS, "pause", "imageLoadStatus")("hover", "All Images Loaded"))
            } 
        }
        ele.onError = () => dispatch(makeActionCreator(IMAGE_LOAD_ERROR, "imageLoadStatus")("Load Failed!"))
    }
}

 export { CarouselImageLoadAction, OnClickHandlerAction, ImagesLoadAction };
