
exports.seed = function(knex) {
  const categories = [
    {//1
      category: 'side dishes'
    },
    {//2
    category: 'main dishes'
    },
    {//3
      category: 'dinner'
    },
    {//4
    category: 'bread'
    },
    {//5
      category: 'appetizers'
    },
    {//6
    category: 'breakfast'
    },
    {//7
      category: 'lunch'
    }
  ]

  return knex('categories').insert(categories)
};
