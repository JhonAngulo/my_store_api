'use strict'

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const routerApi = require('./routes')
const { checkApiKey } = require('./middlewares/auth_hanlder')

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error_handler')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const whitelist = ['http://localhost:8080', 'https://myapp.co']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('no permitido'))
    }
  }
}

require('./utils/auth')
app.use(cors(options))
app.use(helmet())

app.use(checkApiKey)
routerApi(app)

app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started and listening at http://localhost:${port}`)
})
