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
const createRecipe = () => {
    const recipe = {
        id: uuidv4(),
        title: 'new title',
        body: 'new body',
        ingredients: ['ingredient 1', 'ingredient 2']
    }
    saveRecipe(recipe)
    return recipe
}

recipes = getRecipes()
saveRecipeList()

export { getRecipes, saveRecipeList, saveRecipe, deleteRecipe, createRecipe }