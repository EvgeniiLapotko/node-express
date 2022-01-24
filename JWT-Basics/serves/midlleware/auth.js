const { UnauthentificatedError} = require('../errors/index')
const jwt = require('jsonwebtoken')

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthentificatedError('Token not found')
    }
    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {id, username} = decoded
        req.user = {id, username}
        next()
    }catch (e) {
        throw new UnauthentificatedError('Not authorized to access this route')
    }

}


module.exports = authenticationMiddleware
