const db = require('../data/db-connection')


module.exports = {
    add,
    getAllRecipes,
    // findBy,
    findById,
    remove,
    getUserRecipes, 
    updateUserRecipe

    
}

function getAllRecipes() {
    return db('recipes')
    .join('users', 'users.id', 'recipes.user_id')
    .select('recipes.id','recipes.title', 'recipes.source', 'recipes.image', 'recipes.description', 'recipes.category'
    ,'users.username')
    // .orderBy('recipes.id')
}

function getUserRecipes(user_id) {
    return db('recipes')
    .join('users', 'users.id', 'recipes.user_id')
    .select('recipes.id','recipes.title', 'recipes.source', 'recipes.image', 'recipes.description', 'recipes.category')
    .where({'users.id': user_id })
}

function findById(id) {
    return db('recipes')
    .join('users', 'users.id', 'recipes.user_id')
    .select('recipes.id','recipes.title', 'recipes.source', 'recipes.image', 'recipes.description', 'recipes.category', 'users.username')
    .where({'recipes.id': id })
    .first()
}

function add(recipe) {
    return db('recipes')
    .join('recipe_categories', 'recipes.id', 'recipe_categories.id')
    .join('categories', 'categories.id', 'recipe_categories.id')
    .insert(recipe, 'id')
    .then(([id]) => {
        return findById(id)
    })
}

function remove(recipe_id) {
    return db('recipes')
    .where({ 'recipes.id': recipe_id})
    .del()
}

function updateUserRecipe(id, changes) {
    return db('recipes')
    .where({ id })
    .update(changes)
}

// function getCategories(id) {
//     return db('categories')
//     .join('recipe_categories', 'recipe_categories.category.id', 'categories.id')
//     .join('recipes', 'recipes.id', 'recipe_categories.recipe_id')
//     .where({ 'recipe.id': id})
// }