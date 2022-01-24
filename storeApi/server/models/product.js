const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        requires: [true, 'Name required field']
    },
    company: {
        type: String,
        enum: {
            values :['ikea', 'liddy'],
            message: '{VALUE} is not supported'
        },
        requires: [true, 'Company required field']
    },
    price: {
        type: Number,
        requires: [true, 'Price required field']
    },
    featured: {
      type: Boolean,
      default: false
    },
    rating: {
        type: Number,
        default: 4.5
    },
    createdAd: {
        type: Date,
        default: Date.now()
    },
})


module.exports = mongoose.model('Product', productSchema)
