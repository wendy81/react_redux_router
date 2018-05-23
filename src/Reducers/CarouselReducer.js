import states from '../initialState';

export const IMAGE_LOADING = 'IMAGE_LOADING'
export const IMAGE_LOADED_SUCCESS = 'IMAGE_LOADED_SUCCESS'
export const IMAGE_LOAD_ERROR = 'IMAGE_LOADED_SUCCESS'

function CarouselReducer(state = states.carouselState.carousel1, action) {
	let nextIndex;
    switch (action.type) {
    	//Images url+text fetch
		case 'CAROUSEL_ITEMS_LOADING':
            return {...state, status:'loading'}
        case 'CAROUSEL_ITEMS_LOAD_FINISH':
            return {...state, status:'finish',items:action.data}
		case 'CAROUSEL_ITEMS_LOAD_ERROR':
            return {...state, status:'error',error:action.error}

        //Images  load
        case 'IMAGE_LOADING':
            return {...state, imageLoadStatus:action.imageLoadStatus}
        case 'IMAGE_LOADED_SUCCESS':
            return {...state, imageLoadStatus:action.imageLoadStatus}
        case 'ALL_IMAGES_LOADED_SUCCESS':
            return {...state, pause:action.pause, imageLoadStatus:action.imageLoadStatus}    
        case 'IMAGE_LOAD_ERROR':
            return {...state, imageLoadStatus:action.imageLoadStatus}

            

        //Carousel  interactive
        case 'ON_CAROUSEL_EXITING':
            return {...state, animating:true}
        case 'ON_CAROUSEL_EXITED':
            return {...state, animating:false}
        case 'ON_CAROUSEL_NEXT':
	        nextIndex = state.activeIndex === state.items.length - 1 ? 0 : state.activeIndex + 1;
            return {...state, activeIndex:nextIndex}
        case 'ON_CAROUSEL_PREVIOUS':
			nextIndex = state.activeIndex === 0 ? state.items.length - 1 : state.activeIndex - 1;
            return {...state, activeIndex:nextIndex} 
        case 'ON_CAROUSEL_GOTOINDEX':
            return {...state, activeIndex:action.index}    
        default:
			return state;
    }
}

export default CarouselReducer



