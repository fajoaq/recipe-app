import uuidv4 from 'uuid/v4'
let recipes = []

//RETRIEVE DATA
const getRecipes = () => {
    try{
        const recipeObj = localStorage.getItem('recipes')
        if(recipeObj !== null) {
            return JSON.parse(recipeObj)
        } else {
            return []
        }
    } catch (e) {
        return []
    }
}
const getRecipeFromUrl = () => {
    const recipeId = location.hash.substring(1)
    const recipe = recipes.find((r) => r.id == recipeId)

    return recipe
}
const ingredientCount = (recipe) => {
    let complete = 0
    const count = recipe.ingredients.length
    recipe.ingredients.forEach((ingredient) => {
        if(ingredient.checked){ complete++ }
    })
    return {
        complete: complete,
        count: count
    }
}
//SAVE DATA - recipes.js
const saveRecipeList = () => {
    const recipeObj = JSON.stringify(recipes)
    localStorage.setItem('recipes', recipeObj)
}
const saveRecipe = (recipe) => {
    recipes.push(recipe)
    saveRecipeList()
}

//DELETE RECIPE
const deleteRecipe = (id) => {
    const index = recipes.findIndex(function (recipe) {
        return recipe.id === id
    })

    if (index > -1) {
        recipes.splice(index, 1)
        saveRecipeList()
    }
}

//CREATE RECIPE
const createRecipe = () => {
    const recipe = {
        id: uuidv4(),
        title: 'Recipe title',
        body: 'New instructions',
        ingredients: []
    }
    saveRecipe(recipe)
    return recipe.id
}

//EDIT RECIPE
const updateRecipe = (updates) => {
    const recipe = getRecipeFromUrl()

    if(updates.title) {
        recipe.title = updates.title.value
    }
    if(updates.body) {
        recipe.body = updates.body.value
    }
    saveRecipeList()
}
const addIngredient = (name) => {
    const recipe = getRecipeFromUrl()
    recipe.ingredients.push({
        title: name,
        checked: false
    })
    saveRecipeList()
}
const toggleIngredient = (title) => {
    const recipe = getRecipeFromUrl()
    const ingredient = recipe.ingredients.find((i) => i.title === title)

    ingredient.checked = !ingredient.checked
    saveRecipeList()
}
const deleteIngredient = (name) => {
    const recipe = getRecipeFromUrl()

    const index = recipe.ingredients.findIndex(function (i) {
        return i.title === name
    })

    if (index > -1) {
        recipe.ingredients.splice(index, 1)
        saveRecipeList()
    }
}

recipes = getRecipes()
saveRecipeList()

export { getRecipes, saveRecipeList, saveRecipe, deleteRecipe, createRecipe, toggleIngredient, updateRecipe, addIngredient, deleteIngredient, ingredientCount }