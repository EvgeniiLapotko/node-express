
const {BadRequestError, UnauthentificatedError} = require('../errors')
const UserModel = require('../models/User')
require('dotenv').config()
const {StatusCodes} = require('http-status-codes')


const register = async (req, res) => {
    const {name, email, password} = req.body
    if(!name || !email || !password){
        throw new BadRequestError('Name, email, password required field')
    }

    const user = await UserModel.create({name, email, password})
    const token = user.createJWT()

    res.status(StatusCodes.CREATED).json({user, token})
}

const login = async (req, res) => {
    const {email, password} = req.body
    if(!email || !password){
       throw new BadRequestError('email, password required field')
    }
    const user = await UserModel.findOne({email})
    if(!user){
        throw new UnauthentificatedError('Invalid credentials')
    }

    const isPasswordCorrect = await user.comparePassword(password)

    if(!isPasswordCorrect){
        throw new UnauthentificatedError('Password is wrong')
    }

    const token = user.createJWT()

    res.status(StatusCodes.OK).json({user, token})

}


module.exports = {
    register,
    login
}
