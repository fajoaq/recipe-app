import { getRecipes, toggleIngredient, updateRecipe, deleteRecipe, deleteIngredient } from './recipe'

//DISPLAY DATA - views.js
const filterRecipes = (searchText) => {
    const localRecipes = getRecipes()

    if(typeof searchText === 'string') {
        return localRecipes.filter((recipe) => {
            return recipe.title.toLowerCase().includes(searchText.toLowerCase())
        })
    } else {
        return localRecipes
    }
}

const createPreviewDOM = (recipe) => {
    const recipeContainerDOM = document.createElement('a')
    recipeContainerDOM.setAttribute('href', `edit.html#${recipe.id}`)

    const title = document.createElement('h3')
    const body = document.createElement('p')
    
    title.textContent = recipe.title
    body.textContent = `${recipe.body.substring(0, 47)}...`

    recipeContainerDOM.appendChild(title)
    recipeContainerDOM.appendChild(body)
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

const createRecipeDetailsDOM = (recipe) => {
    const container = document.createElement('div')

    recipe.ingredients.forEach((ingredient) => {
        const innerContainer = document.createElement('div')
        const checkbox = document.createElement('input')
        const title = document.createElement('span')
        const deleteIngredientBtn = document.createElement('button')

        checkbox.setAttribute('type', 'checkbox')
        checkbox.checked = ingredient.checked
        title.textContent = ingredient.title
        deleteIngredientBtn.innerHTML = 'remove'

        checkbox.addEventListener('change', () => {
            toggleIngredient(ingredient.title)
        })
        deleteIngredientBtn.addEventListener('click', () => {
            deleteIngredient(ingredient.title)
            renderRecipeDetails()
        })

        innerContainer.appendChild(checkbox)
        innerContainer.appendChild(title)
        innerContainer.appendChild(deleteIngredientBtn)
        container.appendChild(innerContainer)
    })
    return container
}

const renderRecipeDetails = () => {
    const recipeId = location.hash.substring(1)
    const title = document.querySelector('#title')
    const body = document.querySelector('#recipe-details')
    const ingredientsContainer = document.querySelector('#ingredients-container')
    ingredientsContainer.innerHTML = ''

    const localRecipe = getRecipes()
    const recipe = localRecipe.find((recipe) => recipe.id === recipeId)

    title.value = recipe.title
    body.value = recipe.body

    title.addEventListener('input', () => {
        updateRecipe({title: title, body: undefined})
    })
    body.addEventListener('input', () => {
        updateRecipe({title: undefined, body: body})
    })
    ingredientsContainer.appendChild(createRecipeDetailsDOM(recipe))
}

export { renderRecipePreview, renderRecipeDetails }