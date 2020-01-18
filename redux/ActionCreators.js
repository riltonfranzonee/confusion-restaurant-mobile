import * as ActionTypes from './ActionTypes'
import {baseUrl} from '../shared/baseUrl'
import { dishes }  from './dishes'
import { comments } from './comments'
import { leaders }  from './leaders'
import { promotions } from './promotions'

export const fetchDishes = () => dispatch => {
    dispatch(dishesLoading())
    return fetch(baseUrl + 'dishes')
            .them(response => {
                if(response.ok){
                    return response
                } else{
                    var error = new Error('Error ' + response.status + ': ' + response.statusText)
                    error.response = response
                    throw error
                }
            },
            error => {
                var error = new Error(error.message)
                throw errMess
            })
            .then(response => response.json())
            .then(dishes => dispatch(addDishes(dishes)))
            .catch(error => dispatch(dishesFailed(error.message)))
}

export const dishesFailed = errmess => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
})

export const addDishes = dishes => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
})

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING,
})


export const fetchComments = () => dispatch => {
    return fetch(baseUrl + 'comments')
            .them(response => {
                if(response.ok){
                    return response
                } else{
                    var error = new Error('Error ' + response.status + ': ' + response.statusText)
                    error.response = response
                    throw error
                }
            },
            error => {
                var error = new Error(error.message)
                throw errMess
            })
            .then(response => response.json())
            .then(comments => dispatch(addComments(comments)))
            .catch(error => dispatch(commentsFailed(error.message)))
}

export const commentsFailed = errmess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
})

export const addComments = comments => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
})

export const fetchPromotions = () => dispatch => {
    dispatch(promosLoading())
    return fetch(baseUrl + 'promotions')
            .them(response => {
                if(response.ok){
                    return response
                } else{
                    var error = new Error('Error ' + response.status + ': ' + response.statusText)
                    error.response = response
                    throw error
                }
            },
            error => {
                var error = new Error(error.message)
                throw errMess
            })
            .then(response => response.json())
            .then(promotions => dispatch(addPromos(promotions)))
            .catch(error => dispatch(promosFailed(error.message)))
}

export const promosFailed = errmess => ({
    type: ActionTypes.PROMOS_FAILED,
    payload: errmess
})

export const addPromos = promotions => ({
    type: ActionTypes.ADD_PROMOS,
    payload: promotions
})

export const promosLoading = () => ({
    type: ActionTypes.PROMOS_LOADING,
})

export const fetchLeaders = () => dispatch => {
    dispatch(leadersLoading())
    return fetch(baseUrl + 'leaders')
            .them(response => {
                if(response.ok){
                    return response
                } else{
                    var error = new Error('Error ' + response.status + ': ' + response.statusText)
                    error.response = response
                    throw error
                }
            },
            error => {
                var error = new Error(error.message)
                throw errMess
            })
            .then(response => response.json())
            .then(leaders => dispatch(addLeaders(leaders)))
            .catch(error => dispatch(leadersFailed(error.message)))
}

export const leadersFailed = errmess => ({
    type: ActionTypes.LEADERS_FAILED,
    payload: errmess
})

export const addleaders = leaders => ({
    type: ActionTypes.ADD_LEADERS,
    payload: leaders
})

export const leadersLoading = () => ({
    type: ActionTypes.LEADERS_LOADING,
})