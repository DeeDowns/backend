const express = require('express')
const Recipes = require('./recipesModel')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({ access: 'granted' })
})

module.exports = router