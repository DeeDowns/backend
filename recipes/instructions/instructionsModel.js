const db = require('../../data/db-connection')
const { where } = require('../../data/db-connection')

module.exports = {
    getInstructions,
    addInstructions,
    findInstructionsById,
    updateInstructions,
    removeInstructions
}

function getInstructions(recipe_id) {
    return db('instructions')
    .join('recipes', 'recipes.id', 'instructions.recipe_id')
    .select('instructions.id', 'instructions.step_number', 'instructions.instructions', 'recipes.id as recipe_id')
    .where('recipes.id', recipe_id)
    .orderBy('instructions.step_number')
}

function findInstructionsById(instruction_id) {
    return db('instructions')
    .where('instructions.id', instruction_id)
    .first()
}

function addInstructions(instructions) {
    return db('instructions')
    .join('recipes', 'recipes.id', 'instructions.recipe_id')
    .insert(instructions, 'id')
    .then(([id]) => {
        return findInstructionsById(id)
    })
}

function updateInstructions(id, changes) {
    return db('instructions')
    .where({ id })
    .update(changes)
}

function removeInstructions(id) {
    return db('instructions')
    .where({ id })
    .del()
}

