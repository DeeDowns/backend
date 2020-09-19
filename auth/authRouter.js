const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const Users = require('../users/usersModel')

const router = express.Router()

router.post('/register', (req, res) => {

})

router.post('/login', (req, res) => {

})

function validateUser(req, res, next) {
    
}

function makeJwt({ id, username }) {
    const payload = {
        username,
        subject: id
    }

    const secret = {
        jwtSecret: process.env.JWT_SECRET || 'super secret sauce'
    }

    const options = {
        expiresIn: '8 hours'
    }

    return jwt.sign(payload, secret.jwtSecret, options)
}