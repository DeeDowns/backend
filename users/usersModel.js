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