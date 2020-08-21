const express = require('express')
const restful = require('node-restful')
const server = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://db1/mydb')

//Middlewares
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(cors())

//ODM
const Client = restful.model('Client', {
    name: {type: String, required: true}
})

Client.methods(['get','post','put','delete'])
Client.updateOptions({new: true, runValidators: true})
//server.get('/', (req, resp, next) => resp.send('Backend'))

//Routes
Client.register(server, '/clients')


server.listen(3000)