const express = require('express')
const session = require('express-session')
const app = express()
const cors = require('cors')
const fs = require('fs')
const IORedis = require('ioredis')
const RedisStore = require('connect-redis').default
const redisClient = new IORedis(process.env.REDIS_URL)
const subscriberClient = new IORedis(process.env.REDIS_URL)

app.use(cors({ origin: ['localhost:8080'], credentials: true }))
app.use(express.json({ limit: '10mb', extended: true }))

fs.readdirSync('./src/routes/').forEach(file => {
  require(`./src/routes/${file}`)(app)
})

const eventsPath = './src/events/'

fs.readdirSync(eventsPath).forEach(function (file) {
  require(eventsPath + file).handleEvent(redisClient, subscriberClient)
})

app.use((req, res, next) => {
  req.redisClient = redisClient
  next()
})

app.use(session({
  store: new RedisStore({ client: redisClient }),
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    domain: new URL(process.env.API_URL).hostname,
    path: '/',
    sameSite: 'Lax',
    maxAge: 1000 * 60 * 3600
  }
}))

app.listen(8080, () => {
  console.log('El servidor está corriendo en el puerto 8080.')
})
