const express = require('express');
const bodyParser = require('body-parser')

const posappRouter = require('./src/routes/r_posapp')

const cors = require('cors')

require('dotenv').config()

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/POSAPP',posappRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`SERVER RUNNING ON PORT ${process.env.PORT}`)
})