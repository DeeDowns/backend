const db = require('../data/db-connection')

module.exports = {
    add,
    findBy,
    findById,
    // removeUserRecipe,
    // getUserRecipes, 
    // updateUserRecipe
}

function findBy(filter) {
    return db('users')
    .where(filter)
    .orderBy('id')
}

function findById(id) {
    return db('users')
    .where({ id })
    .first()
}

function add(user) {
    return db('users')
    .insert(user, 'id')
    .then(([id]) => {
        return findById(id)
    })
}


// function getUserRecipes(id) {
//     return db('recipes')
//     .join('users', 'users.id', 'recipes.user_id')
//     .select('recipes.id','recipes.title', 'recipes.source', 'recipes.image', 'recipes.description', 'recipes.category')
//     .where({'users.id': id })
// }