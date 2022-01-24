const express = require('express')
require('dotenv').config()
require('express-async-errors')
const {notFound} = require('./errors')
const errorHandler = require('./midlleware/error-handler')
const routerAuth = require('./routes/auth')
const routerJobs = require('./routes/jobs')
const connectDB = require('./db/connectDB')
const authMiddleware = require('./midlleware/auth')
const rateLimiter = require('express-rate-limit')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')




const app = express()
const port = 9000

app.set('trust proxy', 1)
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
}))
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

app.use('/api/v1/auth', routerAuth)
app.use('/api/v1/jobs',authMiddleware, routerJobs)
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
