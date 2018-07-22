import { SAVE_RECIPE, DELETE_RECIPE, GET_USER_RECIPES } from "../config";

export const saveRecipe = (data) => {
  return {
    type: SAVE_RECIPE,
    payload: data
  }
}

export const getUserRecipes = (data) => {
    return {
        type: GET_USER_RECIPES,
        payload: data
      }
}

export const deleteRecipe = (id) => {
  return {
    type: DELETE_RECIPE,
    id
  }
}