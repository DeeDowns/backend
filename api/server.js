const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

const authenticate = require('../auth/authentication-middleware')
const authRouter = require('../auth/authRouter')
const recipesRouter = require('../recipes/recipesRouter')
const usersRouter = require('../users/usersRouter')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(logger)

server.use('/auth', authRouter)
server.use('/recipes', authenticate, recipesRouter)
server.use('/users', authenticate, usersRouter)

server.get('/', (req, res) => {
    res.status(200).json({ Welcome: 'to Secret Family Recipes Server' })
})

function logger(req, res, next) {
    console.log(`a ${req.method} request was made to ${req.url}`)
    next()
}

module.exports = server