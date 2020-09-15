const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const redis = require('redis')
const axios = require('axios')


const app = express()
app.use(bodyParser.json())
app.use(cors())

const redisClient = redis.createClient({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST
})


const redisSet = (key, value, ttl) => {
    redisClient.set(key, JSON.stringify(value), 'EX', ttl)
} 

const redisGet = (req, res, next) => {
    redisClient.get(req.path, (error, data) => {
        if (error) res.status(400).send(error)
        if (data !== null) res.status(200).send(JSON.parse(data))
        else next()
    })
} 


app.get('/', redisGet, (req, res) => {
    setTimeout(() => axios.get("https://httpbin.org/get").then(data => {
        try {
            redisSet(req.path, JSON.stringify(data.data), 60)
            res.send(JSON.stringify(data.data))
        } catch (err) {
            res.send({ message: `Error: ${err}`})
        }
    }), 3000)
})

app.listen(5000, () => console.log("Server Running"))