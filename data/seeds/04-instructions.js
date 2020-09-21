
exports.seed = function(knex) {
  const instructions = [
    {
      recipe_id: 1,
      step_number: 1,
      instructions: "Preheat oven to 350 degrees F",
    },
    {
      recipe_id: 1,
      step_number: 2,
      instructions: "In 9x13-inch baking dish, combine macaroni, tuna, soup, and top with cheese ",
    },
    {
      recipe_id: 1,
      step_number: 3,
      instructions: "Bake for 25 minutes or until bubbly, spinkle with fried onions, bake for additional 5 minutes",
    },
    //next recipe
    {
      recipe_id: 2,
      step_number: 1,
      instructions: "Mix self-rising flour and Greek yogurt together, transfer to lightly floured surface and need until smooth, add more flour as needed to keep dough from sticking",
    },
    {
      recipe_id: 2,
      step_number: 2,
      instructions: "Pat dough into a rough 9x7-inch rectangle, divide into 8 equal pieces, lightly dust each piece with flour and flatten into a semi-rectangle shape, about 1/4 inch thick",
    },
    {
      recipe_id: 2,
      step_number: 3,
      instructions: "Lightly grease large skillet and place over medium heat, cook each piece about 2-4 minutes on both sides until they begin to bubble and brown",
    },
    //next recipe
    {
      recipe_id: 3,
      step_number: 1,
      instructions: "Preheat oven to 400 degrees F",
    },
    {
      recipe_id: 3,
      step_number: 2,
      instructions: "In a large bowl, toss butternut squash with olive oil and garlic, arrange on a baking sheet and season with salt and pepper",
    },
    {
      recipe_id: 3,
      step_number: 3,
      instructions: "Roast about 25-30 minutes, until the squash is tender and lightly browned",
    }
  ]

  return knex('instructions').insert(instructions)
};
