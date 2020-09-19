
exports.seed = function(knex) {
  const recipeIngredients = [
    {
      recipe_id: 1,
      ingredient_id: 1,
      quantity: '3',
      unit_of_measurement: 'cups'
    },
    {
      recipe_id: 1,
      ingredient_id: 2,
      quantity: '5',
      unit_of_measurement: 'ounces'

    },
    {
      recipe_id: 1,
      ingredient_id: 3,
      quantity: '10.75',
      unit_of_measurement: 'ounces'
    },
    {
      recipe_id: 1,
      ingredient_id: 4,
      quantity: '1',
      unit_of_measurement: 'cups'
    },
    {
      recipe_id: 2,
      ingredient_id: 5,
      quantity: '1 1/4',
      unit_of_measurement: 'cups'
    },
    {
      recipe_id: 2,
      ingredient_id: 6,
      quantity: '1',
      unit_of_measurement: 'cup'
    },
    {
      recipe_id: 3,
      ingredient_id: 7,
      quantity: '1',
      unit_of_measurement: 'squash'
    },
    {
      recipe_id: 3,
      ingredient_id: 8,
      quantity: '2',
      unit_of_measurement: 'tablespoons'
    },
    {
      recipe_id: 3,
      ingredient_id: 9,
      quantity: '2',
      unit_of_measurement: 'cloves'
    },
    {
      recipe_id: 3,
      ingredient_id: 10,
      quantity: '1',
      unit_of_measurement: 'pinch'
    },
    {
      recipe_id: 3,
      ingredient_id: 11,
      quantity: '1',
      unit_of_measurement: 'pinch'
    }
  ]

  return knex('recipe_ingredients').insert(recipeIngredients)
};
