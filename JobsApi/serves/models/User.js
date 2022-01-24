const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')




const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name required field'],
        minlength: 3,
        maxlength: 20
    },

    email: {
        type: String,
        required: [true, 'Email required field'],
        unique: true,
        match:[/\S+@\S+\.\S+/, 'email is not a valid!']
    },

    password: {
        type: String,
        required: [true, 'Password required field'],
        minlength: 3,
    },
})

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password , salt)
    next()
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({userId: this._id, name: this.name}, 'jwtSecret', {
        expiresIn: '30d'
    })
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model('UserModel', UserSchema)
