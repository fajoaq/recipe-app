import { getRecipes, saveRecipeList, saveRecipe, deleteRecipe, createRecipe } from './recipe'
import { renderRecipeDetails } from './views'

renderRecipeDetails()

document.querySelector('#delete-recipe').addEventListener('click', () => {
   deleteRecipe(location.hash.substring(1))
   location.assign('./index.html')
})