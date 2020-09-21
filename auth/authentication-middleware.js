const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const token = req.headers.authorization
    const secret = process.env.JWT_SECRET || 'super secret sauce'

    if(token) {
        jwt.verify(token, secret, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ message: 'unauthorized' })
            } else {
                req.jwt = decodedToken
                next()
            }
        })
    } else {
        res.status(401).json({ message: 'unauthorized' })
    }
}