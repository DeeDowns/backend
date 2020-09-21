-- show all recipes by title, source, image, description, user, category

select recipes.title, recipes.source, recipes.image, recipes.description,  users.username, categories.category 
from recipes
join users on users.id = recipes.user_id
join recipe_categories on recipes.id = recipe_categories.recipe_id
join categories on categories.id = recipe_categories.id


-- show all recipes by title, source, image, description, user, category where recipe id = 1

select recipes.title, recipes.source, recipes.image, recipes.description,  users.username, categories.category 
from recipes
join users on users.id = recipes.user_id
join recipe_categories on recipes.id = recipe_categories.recipe_id
join categories on categories.id = recipe_categories.id
where recipes.id = 1

-- show a recipe's ingredients
select recipes.title, ingredients.id, ingredients.ingredient, recipe_ingredients.quantity, recipe_ingredients.unit_of_measurement
from ingredients
join recipes on recipe_ingredients.recipe_id = recipes.id
join recipe_ingredients on recipe_ingredients.ingredient_id = ingredients.id
where recipes.id = 1 


-- show a recipe's instructions
select * from instructions
join recipes on recipes.id = instructions.recipe_id  
where recipes.id = 1
order by instructions.step_number


