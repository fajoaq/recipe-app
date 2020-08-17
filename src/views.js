import { getRecipes } from './recipe'

//DISPLAY DATA - views.js
const createPreviewDOM = (recipe) => {
    const recipeContainerDOM = document.createElement('a')
    recipeContainerDOM.setAttribute('href', `edit.html#${recipe.id}`)

    const previewParts = {
        title: document.createElement('p2'),
        body: document.createElement('p')
    }
    previewParts.title.textContent = recipe.title
    previewParts.body.textContent = recipe.body

    recipeContainerDOM.appendChild(previewParts.title)
    recipeContainerDOM.appendChild(previewParts.body)
    return recipeContainerDOM
}

const renderRecipePreview = () =>{
    const parentDiv = document.querySelector('#recipe-container')
    const localRecipes = getRecipes()

    localRecipes.forEach((recipe) => {
        const previewDom = createPreviewDOM(recipe)
        parentDiv.appendChild(previewDom)
    })
}

export { renderRecipePreview as default}