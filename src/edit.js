import { getRecipes, saveRecipeList, saveRecipe, deleteRecipe, createRecipe, addIngredient } from './recipe'
import { renderRecipeDetails } from './views'

renderRecipeDetails()

document.querySelector('#delete-recipe').addEventListener('click', () => {
   deleteRecipe(location.hash.substring(1))
   location.assign('./index.html')
})

document.querySelector('#add-ingredient').addEventListener('click', () => {
   const ingredientText = document.querySelector('#ingredient-input')
   addIngredient(ingredientText.value)
   renderRecipeDetails()
   ingredientText.value = ''
})
document.querySelector('#ingredient-input').addEventListener('keyup', (e) => {
   if(event.isComposing || event.keyCode === 13) { //Return key
      const ingredientText = document.querySelector('#ingredient-input')
      if(ingredientText.value.length > 0) {
         addIngredient(ingredientText.value)
         renderRecipeDetails()
         ingredientText.value = ''
      }
   }
})