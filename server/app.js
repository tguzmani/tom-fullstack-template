const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connection = require('./database')
const { monitor, csv } = require('./logger')

require('dotenv').config()

const useRoute = entity => {
  app.use(`/api/${entity}`, require(`./src/${entity}/${entity}.routes`))
}

// App initialization
const app = express()

// Middleware
app.use(express.json({ extended: false }))
app.use(monitor)
app.use(cookieParser())
app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })
)

// Routes Middleware
routes = ['users']

routes.forEach(route => useRoute(route))

// Listen
const port = process.env.PORT || 5000

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`)
})

// function keepMySQLAlive() {
//   connection.query('select 1', [], (error, _) => {
//     if (error) throw error
//     console.log('...')
//   })
// }

// const ONE_SECOND = 1000

// setInterval(keepMySQLAlive, ONE_SECOND * 10)
