const mongoose = require('mongoose')

const jwt = new mongoose.Schema({
    jwt : {
        type: String
    }
})

module.exports = mongoose.model('Jwt', jwt)
