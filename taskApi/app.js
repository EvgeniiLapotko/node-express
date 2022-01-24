const express = require('express')
const router = require('./routes/index')
const app = express()
const connectDB = require('./db/connect')
const notFound = require('./middleware/not-found')
require('dotenv').config()

const port = 9090

app.use(express.json())

app.use('/api/v1/tasks', router)

app.use(notFound)

app.get('/product')



const start = async () => {
    try{
        await connectDB(process.env.DB_CONNECT_STRING)
        console.log('DB connection ...')
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    }catch (e) {
        console.log(e)
    }
}

start()


