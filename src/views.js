import { getRecipes } from './recipe'

//DISPLAY DATA - views.js
const filterRecipes = (searchText) => {
    const recipes = getRecipes()

    if(typeof searchText === 'string') {
        return recipes.filter((recipe) => {
            return recipe.title.toLowerCase().includes(searchText.toLowerCase())
        })
    } else {
        return recipes
    }
}

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

const renderRecipePreview = (searchText) =>{
    const parentDiv = document.querySelector('#recipe-container')
    const localRecipes = filterRecipes(searchText)
    parentDiv.innerHTML = ''
    
    localRecipes.forEach((recipe) => {
        const previewDom = createPreviewDOM(recipe)
        parentDiv.appendChild(previewDom)
    })
}

export { renderRecipePreview as default}