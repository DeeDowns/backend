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
