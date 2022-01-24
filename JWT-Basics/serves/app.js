const express = require('express')
require('dotenv').config()
require('express-async-errors')
const notFound = require('./midlleware/notFound')
const errorHandler = require('./midlleware/error-handler')
const router = require('./routes/route')
const connectDB = require('./db/connectDB')



const app = express()
const port = 9000

app.use(express.json())
app.use('/api/v1/', router)
app.use(notFound)
app.use(errorHandler)



const start = async () => {
    try{
        await connectDB(process.env.DB_CONNECT_STRING)
        console.log('Connected DB')
        app.listen(port, () => console.log('Serves listening on port ' + port))
    }catch (e) {
        console.log(e)
    }
}

start()
