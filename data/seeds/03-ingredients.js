
exports.seed = function(knex) {
  const ingredients = [
    {//1
      ingredient: '3 cups of cooked macaroni',
      recipe_id: 1
    },
    {//2
      ingredient: '5 oz of canned tuna',
      recipe_id: 1
    },
    {//3
      ingredient: '10.75 oz of condensed cream of chicken soup',
      recipe_id: 1
    },
    {//4
      ingredient: '1 cup of shredded cheddar cheese',
      recipe_id: 1
    },

    {//5
      ingredient: '1 1/4 cups of self-rising flour',
      recipe_id: 2
    },
    {//6
      ingredient: '1 cup of whole-milk greek yogurt',
      recipe_id: 2
    },

    {//7
      ingredient: '1 butternut squash cubed',
      recipe_id: 3
    },
    {//8
      ingredient: '2 tablespoons of olive oil',
      recipe_id: 3
    },
    {//9
      ingredient: '2 cloves of garlic minced',
      recipe_id: 3
    },
    {//10
      ingredient: '1 pinch of salt',
      recipe_id: 3
    },
    {//11
      ingredient: '2 pinch of pepper',
      recipe_id: 3
    },
  ]

  return knex('ingredients').insert(ingredients)
};
