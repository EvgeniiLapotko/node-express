const express = require('express')
const router = require('./routes/index')
const connectDB = require('./db/connect')
const notFound = require('./midlleware/not-found')
const errorHandler = require('./midlleware/error-handler')
require('dotenv').config()
require('express-async-errors')




const app = express()

app.use(express.json())

app.use('/api/v1/products' , router)
app.use(notFound)
app.use(errorHandler)

const port = 9000

const start =  async () => {
    try{
        await connectDB(process.env.DB_CONNECT_STRING)
        console.log('Connect DB')
        app.listen(port, () => {
            console.log(`Server listening on the port - ${port}`)
        })
    }catch (e) {
        console.log(e)
    }

}

start()


