import {
    DATA_FETCH_BEGIN,
    DATA_FETCH_FAILURE,
    FEATURED_DATA_FETCH_SUCCESS,
    LIST_DATA_FETCH_SUCCESS,
    DETAIL_DATA_FETCH_SUCCESS,
    ACTOR_DATA_FETCH_SUCCESS,

    makeActionCreator
} from './ActionTypes'

function GetDataAction(matchUrl) {
    return function(dispatch) {
        dispatch(makeActionCreator(DATA_FETCH_BEGIN, 'loading', 'status')(false, 'Loading...' ))
        fetch('/data.json').then( data => data.json()).then(json => {
            const url = matchUrl.slice(1)
            switch (url) {
                case 'home':
                    dispatch(makeActionCreator(FEATURED_DATA_FETCH_SUCCESS,'loading', 'status', 'data')(true, 'Loaded', json.featured));
                    break;
                case 'list':
                    dispatch(makeActionCreator(LIST_DATA_FETCH_SUCCESS,'loading', 'status', 'data')(true, 'Loaded', json.lists));
                    break;
                default:
                    break;
            }
        }).catch((err) => {
            dispatch(makeActionCreator(DATA_FETCH_FAILURE,'loading','status','error')(false,'load failure:',err))
        })
    }
}

export default GetDataAction;
