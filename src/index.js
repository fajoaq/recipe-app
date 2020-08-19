import { getRecipes, saveRecipeList, saveRecipe, deleteRecipe, createRecipe } from './recipe'
import { renderRecipePreview } from './views'

renderRecipePreview()

document.querySelector('#search-recipes').addEventListener('input', (e) => {
    renderRecipePreview(e.target.value)
})
document.querySelector('#add-recipe').addEventListener('click', (e) => {
    e.preventDefault()
    location.assign(`./edit.html#${createRecipe()}`)
})