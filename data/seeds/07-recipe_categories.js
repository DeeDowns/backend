
exports.seed = function(knex) {
  const recipeCategories = [
    {
      recipe_id: 1,
      category_id: 2
    },
    {
      recipe_id: 1,
      category_id: 3
    },
    {
      recipe_id: 2,
      category_id: 1
    },
    {
      recipe_id: 2,
      category_id: 4
    },
    {
      recipe_id: 2,
      category_id: 5
    },
    {
      recipe_id: 3,
      category_id: 1
    }
  ]

  return knex('recipe_categories').insert(recipeCategories)
};
