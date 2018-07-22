import { SAVE_RECIPE, DELETE_RECIPE, GET_USER_RECIPES } from '../config'

export const recipeState = {
    id: "",
    image: "",
    source: "",
    title: "",
    publisher: "",
    userid: "" ,
    recipes: []  
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
        case GET_USER_RECIPES:
            return { ...state, 
                recipes: action.payload
            };
        case DELETE_RECIPE:
            return state.recipes.filter(recipe =>
                recipe.recipe_id !== action.id
            )
        default: 
            return state;
    }
}