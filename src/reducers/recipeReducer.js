import { SAVE_RECIPE, DELETE_RECIPE } from '../config'

export const recipeState = {
    image: "",
    source: "",
    title: "",
    publisher: "",
    userid: ""   
}

export const recipeReducer = (state = recipeState, action) => {
    switch (action.type) {
        case SAVE_RECIPE:
            let newState = {...state};
            newState.image = action.payload.image;
            newState.source = action.payload.source;
            newState.title = action.payload.title;
            newState.publisher = action.payload.publisher;
            newState.userid = action.payload.userid;
            return newState;
        case DELETE_RECIPE:
            return state;
        default: 
            return state;
    }
}