import * as ActionTypes from './ActionTypes'

const initialState = {
    errMess: null,
    comments: []
}

export const comments = (state = { errMess: null, comments:[]}, action) => {
    switch(action.type){
        case ActionTypes.ADD_COMMENTS:
            return{...state, errMess: null, comments: action.payload}
       
        case ActionTypes.COMMENTS_FAILED:
            return{...state, errMess: action.payload, comments: []} 

        case ActionTypes.ADD_COMMENT:
            let comment = action.payload 
            return {...state, comments: state.comments.concat(comment)}
            
        default:
            return state
    }

}