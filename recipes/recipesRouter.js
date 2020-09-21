const express = require('express')
const Recipes = require('./recipesModel')
const Ingredients = require('./ingredients/ingredientsModel')
const Categories = require('./categories/categoriesModel')

const router = express.Router()

//get all recipes from all users
router.get('/all-users', (req, res) => {
    Recipes.getAllRecipes()
    .then(recipes => {
        console.log(recipes)
        res.status(200).json(recipes)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
})

// get recipe by id from any user
router.get('/all-users/:id', validateRecipeId, (req, res) => {
    res.status(200).json(req.recipe)    
})


//get all recipes from logged-in user
router.get('/my-recipes', (req, res) => {
    const user_id = req.jwt.subject
    Recipes.getUserRecipes(user_id)
    .then(userRecipes => {
        console.log(userRecipes)
        if(!userRecipes) {
            res.status(404).json({ message: 'you do not have any recipes' })
        } else {
            res.status(200).json(userRecipes)
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
})

//get logged-in user's recipe by id
router.get('/my-recipes/:id', validateUserRecipe, (req, res) => {
    // const user_id = req.jwt.username
    // const { id } = req.params

    // Recipes.findById(id)
    // .then(recipe => {
    //     console.log(recipe)
    //     if(recipe.username === user_id) {
    //         res.status(200).json(recipe)
    //     } else {
    //         res.status(403).json({ message: 'recipe not yours' })
    //     }
    // })
    // .catch(err => {
    //     res.status(500).json({ message: err.message })
    // })

    res.status(200).json(req.recipe)
})

//add logged-in user's new recipe
router.post('/my-recipes', (req, res) => {
    const { title, source, image, description, category, user_id } = req.body
    const userId = req.jwt.subject

    Recipes.addUserRecipe({ title, source, image, description, category, user_id: userId })
    .then(recipe => {
        console.log(recipe)
        res.status(201).json({message: 'recipe added', recipe})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
})

//removed logged-in user's recipe
router.delete('/my-recipes/:id', validateRecipeId, validateUserRecipe, (req, res) => {
    const { id } = req.params

    Recipes.removeUserRecipe(id)
    .then(count => {
        console.log(count)
        if(count > 0) {
            res.status(200).json({ message: 'recipe removed' })
        } else {
            res.status(400).json({ message: 'error removing recipe' })
        }
       
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
})

//edit logged-in users recipe
router.put('/my-recipes/:id', validateRecipeId, validateUserRecipe, (req, res) => {
    const { id }  = req.params
    const changes = req.body
    // const userId = req.jwt.subject

    Recipes.updateUserRecipe(id, changes)
    .then(count => {
        console.log(count)
        if(count > 0) {
            res.status(200).json({message: 'recipe updated' })
        } else {
            res.status(400).json({ message: 'error updating recipe' })
        }  
    })
    .catch(err => {
        console.log(err)
    })
})

//get recipe's ingredients
router.get('/my-recipes/:id/ingredients', (req, res) => {
    const { id } = req.params

    Ingredients.getIngredients(id)
    .then(ingredients => {
        console.log(ingredients)
        res.status(200).json(ingredients)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
})

router.post('/my-recipes/:id/ingredients', (req, res) => {
    const { id } = req.params
    const { ingredient, recipe_id } = req.body

    Ingredients.addIngredients({ ingredient, recipe_id: id})
    .then(ingredient => {
        console.log(ingredient)
        res.status(201).json(ingredient)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
})







/******* custom middleware ********/

//searches for all recipes by id
//if no recipe, return 404 error
function validateRecipeId(req, res, next) {
    const { id } = req.params
    const user_id = req.jwt.username
   
    Recipes.findById(id)
    .then(recipe => {
        if(!recipe && recipe.username !== user_id) {
            res.status(404).json({ message: 'recipe not found' })
        } else {
            req.recipe = recipe
            next()
        }
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ message: err.message })
    })
       
}

//searches for recipe by id
//if no recipe, return 404 error
//if the recipe doesn't belong to the user, return 403 error
function validateUserRecipe(req, res, next) {
    const user_id = req.jwt.username
    const { id } = req.params

    Recipes.findById(id)
    .then(recipe => {
         if (recipe.username !== user_id) {
            res.status(403).json({ message: 'recipe not yours' })
            
        } else {
            // res.status(200).json(recipe)
            req.recipe = recipe
            next()
        }
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    }) 
}

// function validatePostRecipe(req, res, next) {
//     const { title, category } = req.body

//     if(!req.body) {
//         res.status(400).json({ message: 'missing recipe information' })
//     } else if(!title && category === null) {
//         res.status(400).json({ message: 'recipe needs title and category'})
//     } else {
//         next()
//     }
// }


module.exports = router