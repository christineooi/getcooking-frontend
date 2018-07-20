import { combineReducers } from 'redux';
import { userState, authReducer } from './authReducer.js';

export const initialState = {
    userState:userState
}

export default combineReducers( {
    authReducer,
    // recipeReducer
})