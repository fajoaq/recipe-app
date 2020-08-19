import { getRecipes, toggleIngredient, updateRecipe, deleteRecipe, deleteIngredient, ingredientCount } from './recipe'

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
    recipeContainerDOM.classList.add('preview-container')
    recipeContainerDOM.setAttribute('href', `edit.html#${recipe.id}`)
    const ingredients = ingredientCount(recipe)

    const title = document.createElement('h3')
    title.classList.add('preview-title')
    const ingredientGraphic = document.createElement('img')
    ingredientGraphic.setAttribute('src', '../images/ingredients.svg')
    const ingredientCountDOM = document.createElement('span')
    const body = document.createElement('p')
    
    title.textContent = recipe.title
    ingredientCountDOM.innerHTML = `${ingredients.complete}/${ingredients.count}`
    body.textContent = `${recipe.body.substring(0, 47)}...`

    recipeContainerDOM.appendChild(title)
    recipeContainerDOM.appendChild(ingredientGraphic)
    recipeContainerDOM.appendChild(ingredientCountDOM)
    recipeContainerDOM.appendChild(body)
    return recipeContainerDOM
}

const renderRecipePreview = (searchText) =>{
    const parentDiv = document.querySelector('#recipe-container')
    const localRecipes = filterRecipes(searchText)
    parentDiv.innerHTML = ''
    
    if(localRecipes.length === 0) {      
        const previewDom = document.createElement('p')  
        previewDom.innerHTML = 'No recipes to show. <br />Create a recipe and lets get cooking!'
        parentDiv.appendChild(previewDom)
    } else {
        localRecipes.forEach((recipe) => {
            parentDiv.appendChild(createPreviewDOM(recipe))
        })
    }
/*     parentDiv.appendChild(previewDom) */
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
        innerContainer.classList.add('recipe-item')
        innerContainer.appendChild(checkbox)
        innerContainer.appendChild(title)
        innerContainer.appendChild(deleteIngredientBtn)
        container.appendChild(innerContainer)
    })
    return container
}

const renderRecipeDetails = () => {
    const recipeId = location.hash.substring(1)
    const title = document.querySelector('#edit-title')
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