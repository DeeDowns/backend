# Base URL: https://bw-secret-family-recipes.herokuapp.com

## **Users**
id: 1 //auto-generated
username: 'loveToCook82' // string, required
password: 'test' //string, required (will be hashed)

### /auth
| Method | URL            | Description         |
| ------ | -------------- | ------------------- |
| POST   | /auth/register | register a new user |
| POST   | /auth/login    | login user          |



## **Recipes**
id: 1 //auto-generated
title: 'Easy Tuna Casserole' // string, required
source: 'Grandma May' //string, required
image: 'image_url' //string, optional
description: 'yummy and quick casserole, thats been in our family for years' //optional
category: 'dinner' //optional
username: 'loveToCook82' // string, (user who posted recipe)

### /recipes/all
| Method | URL               | Description                            |
| ------ | ----------------- | -------------------------------------- |
| POST   | /recipes/all      | fetch recipes from all users           |
| POST   | /recipes/all/:id  | fetch specific recipe from any user    |



## **User Recipes**
 > any endpoint with `/recipes/my-recipes`:
 >  * a user will only be able to view, post, edit, and delete their own recipes
 >  * will not be able to manipulate other user's recipes

### /recipes/my-recipes
| Method | URL                      | Description                       |
| ------ | ------------------------ | --------------------------------- |
| GET    | /recipes/my-recipes      | fetch all recipes from user       |
| GET    | /recipes/my-recipes/:id  | fetch specific recipe from user   |
| POST   | /recipes/my-recipes      | add new recipe from user          |
| PUT    | /recipes/my-recipes/:id  | update specific recipe from user  |
| DELETE | /recipes/my-recipes /:id | delete specific recipe from users |



## **Ingredients**
id: 1, // auto-generated
ingredient: "3 cups of cooked macaroni" //string, required
recipe_id: 1 // auto-generated

### /recipes/all/:id/ingrededients
| Method | URL                          | Description                                             |
| ------ | ---------------------------- | ------------------------------------------------------- |
| GET    | /recipes/all/:id/ingredients | fetch all ingredients for specific recipe from any user |


## **User Ingredients**
### /recipes/my-recipes/:id/ingredients
| Method | URL                                          | Description                                         |
| ------ | -------------------------------------------- | --------------------------------------------------- |
| GET    | /recipes/my-recipes/:id/ingredients          | fetch all ingredients for specific recipe from user |
| GET    | /recipes/my-recipes/:id/ingredients/:ing_id  | fetch specific recipe from user                     |
| POST   | /recipes/my-recipes/:id/ingredients          | add new ingredient to specific recipe from user     |
| PUT    | /recipes/my-recipes/:id/ingredients/:ing_id  | update ingredient for specific recipe from user     |
| DELETE | /recipes/my-recipes /:id/ingredients/:ing_id | delete ingredient from specific recipe from user    |

## **Insructions**
id: 1 //auto-generated
step_number: 1 // integer, required
instructions: 'Preheat oven to 350 degrees F' // string, required
recipe_id: 1 //auto-generated


### /recipes/all/:id/instructions
| Method | URL                           | Description                                              |
| ------ | ----------------------------- | -------------------------------------------------------- |
| GET    | /recipes/all/:id/instructions | fetch all instructions for specific recipe from any user |


## **User Instructions**
### /recipes/my-recipes/:id/instructions
| Method | URL                                          | Description                                       |
| ------ | -------------------------------------------- | ------------------------------------------------  |
| GET    | /recipes/my-recipes/:id/instructions          | fetch all recipes from user                      |
| GET    | /recipes/my-recipes/:id/instructions/:ing_id  | fetch specific recipe from user                  |
| POST   | /recipes/my-recipes/:id/instructions          | add new ingredient to specific recipe from user  |
| PUT    | /recipes/my-recipes/:id/instructions/:ing_id  | update ingredient for specific recipe from user  |
| DELETE | /recipes/my-recipes /:id/instructions/:ing_id | delete ingredient from specific recipe from user |