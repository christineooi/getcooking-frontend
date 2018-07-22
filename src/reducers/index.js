import { combineReducers } from 'redux';
import { userState, authReducer } from './authReducer.js';
import { recipeState, recipeReducer } from './recipeReducer.js';

export const initialState = {
    userState:userState,
    recipeState:recipeState
}

export default combineReducers( {
    authReducer,
    recipeReducer
})