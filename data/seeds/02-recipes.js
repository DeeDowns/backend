exports.seed = function(knex) {
  const recipes = [
    {//1
      title: 'Easy Tuna Casserole',
      source: 'Grandma May',
      description: 'yummy and quick casserole, thats been in our family for years',
      category: 'dinner',
      image: 'https://imagesvc.meredithcorp.io/v3/mm/image?q=85&c=sc&poi=face&w=1439&h=753&url=https%3A%2F%2Fimages.media-allrecipes.com%2Fuserphotos%2F4560684.jpg',
      user_id: 1
    },
    {//2
      title: 'Two-Ingredient Naan',
      source: 'Great Uncle Joe',
      description: 'easy to make naan bread that our family makes together during holidays',
      category: 'bread',
      image: 'https://lilluna.com/wp-content/uploads/2019/01/naan-2-768x655.jpg',
      user_id: 2
    },
    {//3
      title: 'Roasted Butternut Squash ',
      source: 'Great Grandmother Elda',
      description: 'healthy side dish passed down from generation to generation',
      category: 'side dish',
      image: 'https://www.wellplated.com/wp-content/uploads/2017/11/Cinnamon-Roasted-Butternut-Squash-Easy-butternut-squash-recipe-600x809.jpg',
      user_id: 1
    }
  ]

  return knex('recipes').insert(recipes)
};
