const express = require('express')
const cors = require('cors')
const helmet = require('helmet')

// const authenitcate 
// const authRouter = requre
// const recipesRouter = require

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(logger)

//server.use('/auth', authRouter)
//server.use('/recipes', authenticate, recipesRouter)

server.get('/', (req, res) => {
    res.status(200).json({ Welcome: 'to Secret Family Recipes Server' })
})

function logger(req, res, next) {
    console.log(`a ${req.method} request was made to ${req.url}`)
    next()
}

module.exports = server