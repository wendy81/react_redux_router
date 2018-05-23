export function makeActionCreator(type, ...argNames) {
  return function (...args) {
    const action = { type }
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index]
    })
    return action
  }
}


//ALL DATA LOAD
export const DATA_FETCH_BEGIN = 'DATA_FETCH_BEGIN'
export const DATA_FETCH_FAILURE = 'DATA_FETCH_FAILURE'

//FEATURED
export const FEATURED_DATA_FETCH_SUCCESS = 'FEATURED_DATA_FETCH_SUCCESS'


//LIST
export const LIST_DATA_FETCH_SUCCESS = 'LIST_DATA_FETCH_SUCCESS'


//DETAIL
export const DETAIL_DATA_FETCH_SUCCESS = 'DETAIL_DATA_FETCH_SUCCESS'


//ACTOR
export const ACTOR_DATA_FETCH_SUCCESS = 'ACTOR_DATA_FETCH_SUCCESS'




//IMAGE LOAD
export const IMAGE_LOADING = 'IMAGE_LOADING'
export const IMAGE_LOADED_SUCCESS = 'IMAGE_LOADED_SUCCESS'
export const ALL_IMAGES_LOADED_SUCCESS = 'ALL_IMAGES_LOADED_SUCCESS'
export const IMAGE_LOAD_ERROR = 'IMAGE_LOADED_FAILURE'














