require('dotenv').config()

const connectDB = require('./server/db/connect')
const Product = require('./server/models/product')


const jsonProduct = require('./products.json')

const start = async () => {
    try{
        await connectDB(process.env.DB_CONNECT_STRING)
        await Product.deleteMany()
        await Product.create(jsonProduct)
        console.log('Seed Success!')
        process.exit(0)
    }catch (e) {
        console.log(e)
        process.exit(0)
    }
}

start()
