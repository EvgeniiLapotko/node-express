const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { UnauthentificatedError} = require('../errors')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthentificatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const {userId} = decoded
        const user = await User.findById(userId).select('-password')
        req.user = {userId: user._id, name: user.name, email: user.email }
        next()
    }catch (e) {
        throw new UnauthentificatedError('Not authorized to access this route')
    }

}


module.exports = authMiddleware
