const db = require('../../data/db-connection')
const { where } = require('../../data/db-connection')

module.exports = {
    getInstructions,
    // addInstructions,
    // findInstructionsById,
    // updateInstructions,
    // removeInstructions
}

function getInstructions(recipe_id) {
    return db('instructions')
    .join('recipes', 'recipes.id', 'instructions.recipe_id')
    .select('instructions.id', 'instructions.step_number', 'instructions.instructions')
    .where('recipes.id', recipe_id)
    .orderBy('instructions.step_number')
}