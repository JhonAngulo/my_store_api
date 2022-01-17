'use strict'

const boom = require('@hapi/boom')
const { config } = require('./../config/config')

function checkApiKey (req, res, next) {
  const apiKey = req.headers['x-api-key']

  if (apiKey === config.apiKey) {
    next()
  } else {
    next(boom.unauthorized())
  }
}

function checkAdminRole (req, res, next) {
  if (req.user.role === 'admin') {
    next()
  } else {
    next(boom.unauthorized())
  }
}

module.exports = checkApiKey
