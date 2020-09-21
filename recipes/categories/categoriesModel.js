const db = require('../../data/db-connection')

module.exports = {
    findByRecipe
}

function findByRecipe(id) {
    return db('categories')
    .join('recipe_categories', 'recipe_categories.category.id', 'categories.id')
    .join('recipes', 'recipes.id', 'recipe_categories.recipe_id')
    .where({ 'recipe.id': id})

}
