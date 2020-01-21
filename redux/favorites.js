import * as ActionTypes from './ActionTypes'

export const favorites = (state =[], action) => {
    switch(action.type){
        case ActionTypes.ADD_FAVORITE:
            //here we are checking if the the favorite item is already in the favorites data
            if(state.some(el => el === action.payload))
                return state
            else
                return state.concat(action.payload)
        case ActionTypes.DELETE_FAVORITE:
            return state.filter(favorite => favorite !== action.payload)
        default: 
            return state   
        }
}