import { SAVE_RECIPE, DELETE_RECIPE } from "../config";

export const saveRecipe = (data) => {
  return {
    type: SAVE_RECIPE,
    payload: data
  }
}

export const deleteRecipe = () => {
  return {
    type: DELETE_RECIPE
  }
}