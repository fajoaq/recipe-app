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
        ingredients: [{title:'ingredient 1', checked: false}, {title:'ingredient 2', checked: false}]
    }
    saveRecipe(recipe)
    return recipe.id
}
const toggleIngredient = (title) => {
    const recipeId = location.hash.substring(1)
    const recipe = recipes.find((r) => r.id == recipeId)
    const ingredient = recipe.ingredients.find((i) => i.title === title)

    ingredient.checked = !ingredient.checked
    console.log(ingredient.checked)
    saveRecipeList()
}

recipes = getRecipes()
saveRecipeList()

export { getRecipes, saveRecipeList, saveRecipe, deleteRecipe, createRecipe, toggleIngredient }