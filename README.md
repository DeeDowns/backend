# Base URL: https://bw-secret-family-recipes.herokuapp.com

## **Users**
```
id: 1; // auto-generated
username: 'loveToCook82'; // string, required
email: 'loveToCook82@email.com'; //string, required
password: 'test'; //string, required (will be hashed)
```

### /auth
| Method | URL            | Description         |
| ------ | -------------- | ------------------- |
| POST   | /auth/register | register a new user |
| POST   | /auth/login    | login user          |



## **Recipes**
```
id: 1; // auto-generated
title: 'Easy Tuna Casserole'; // string, required
source: 'Grandma May'; // string, required
image: 'image_url'; // string, optional
description: 'yummy and quick casserole, thats been in our family for years'; // string, optional
category: 'dinner'; // string, optional
username: 'loveToCook82'; // string, auto-generated (user who posted recipe)
```

### /recipes/all
| Method | URL               | Description                                |
| ------ | ----------------- | ------------------------------------------ |
| GET    | /recipes/all      | fetch all recipes from all users           |
| GET    | /recipes/all/:id  | fetch specific recipe from any user        |



## **User Recipes**
 > any endpoint beginning with `/recipes/user-recipes` means that the user currently logged in:
 >  * will only be able to view, post, edit, and delete their own recipes
 >  * will not be able to manipulate other user's recipes

### /recipes/user-recipes
| Method | URL                        | Description                 |
| ------ | ------------------------   | --------------------------- |
| GET    | /recipes/user-recipes      | fetch all of user's recipes |
| GET    | /recipes/user-recipes/:id  | fetch specific recipe       |
| POST   | /recipes/user-recipes      | add new recipe              |
| PUT    | /recipes/user-recipes/:id  | update specific recipe      |
| DELETE | /recipes/user-recipes /:id | delete specific recipe      |



## **Ingredients**
```
id: 1; // auto-generated
ingredient: "3 cups of cooked macaroni"; //string, required
recipe_id: 1; // auto-generated
```

### /recipes/all/:id/ingrededients
| Method | URL                          | Description                                             |
| ------ | ---------------------------- | ------------------------------------------------------- |
| GET    | /recipes/all/:id/ingredients | fetch all ingredients for specific recipe from any user |


## **User Ingredients**
### /recipes/user-recipes/:id/ingredients
| Method | URL                                            | Description                                   |
| ------ | ---------------------------------------------- | --------------------------------------------- |
| GET    | /recipes/user-recipes/:id/ingredients          | fetch all ingredients for specific recipe     |
| GET    | /recipes/user-recipes/:id/ingredients/:ing_id  | fetch specific ingredient for specific recipe |
| POST   | /recipes/user-recipes/:id/ingredients          | add new ingredient to specific recipe         |
| PUT    | /recipes/user-recipes/:id/ingredients/:ing_id  | update ingredient for specific recipe         |
| DELETE | /recipes/user-recipes /:id/ingredients/:ing_id | delete ingredient from specific recipe        |



## **Insructions**
```
id: 1; //auto-generated
step_number: 1; // integer, required
instructions: 'Preheat oven to 350 degrees F'; // string, required
recipe_id: 1; // auto-generated
```

### /recipes/all/:id/instructions
| Method | URL                           | Description                                              |
| ------ | ----------------------------- | -------------------------------------------------------- |
| GET    | /recipes/all/:id/instructions | fetch all instructions for specific recipe from any user |


## **User Instructions**
### /recipes/user-recipes/:id/instructions
| Method | URL                                             | Description                                      |
| ------ | ----------------------------------------------- | -----------------------------------------------  |
| GET    | /recipes/user-recipes/:id/instructions          | fetch all instructions for specific recipe       |
| GET    | /recipes/user-recipes/:id/instructions/:ing_id  | fetch specific instructions for specific recipe  |
| POST   | /recipes/user-recipes/:id/instructions          | add new instructions to specific recipe          |
| PUT    | /recipes/user-recipes/:id/instructions/:ing_id  | update instructions for specific recipe          |
| DELETE | /recipes/user-recipes /:id/instructions/:ing_id | delete instructions from specific recipe         |