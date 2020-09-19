
exports.seed = function(knex) {
  const ingredients = [
    {//1
      ingredient: 'cooked macaroni'
    },
    {//2
      ingredient: 'tuna'
    },
    {//3
      ingredient: 'condensed cream of chicken soup'
    },
    {//4
      ingredient: 'shredded cheddar cheese'
    },

    {//5
      ingredient: 'self-rising flour'
    },
    {//6
      ingredient: 'whole-milk greek yogurt'
    },

    {//7
      ingredient: 'cubed butternut squash'
    },
    {//8
      ingredient: 'olive oil'
    },
    {//9
      ingredient: 'minced garlic'
    },
    {//10
      ingredient: 'salt'
    },
    {//11
      ingredient: 'pepper'
    },
  ]

  return knex('ingredients').insert(ingredients)
};
