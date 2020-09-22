const db = require('../../data/db-connection')

module.exports = {
    getIngredients,
    addIngredients,
    findIngredientById,
    updateIngredients,
    removeIngredients
}

function getIngredients(recipe_id) {
    return db('ingredients')
    .join('recipes', 'recipes.id', 'ingredients.recipe_id')
    .select('ingredients.id', 'ingredients.ingredient', 'recipes.id as recipe_id')
    .where('recipes.id', recipe_id)
}

function findIngredientById(ingredient_id) {
    return db('ingredients')
    .where('ingredients.id', ingredient_id)
    .first()
   
}

function addIngredients(ingredient) {
    return db('ingredients')
    .join('recipes', 'recipes.id', 'ingredients.recipe_id')
    .insert(ingredient, 'id')
    .then(([id]) => {
        return findIngredientById(id)
    })
   
}

function removeIngredients(id) {
    return db('ingredients') 
    .where({id})
    .del()
}

function updateIngredients(id, changes) {
    return db('ingredients')
    .where({ id })
    .update(changes)
}

