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

function checkAdminRole (req, _res, next) {
  if (req.user.role === 'admin ') {
    next()
  } else {
    next(boom.forbidden('se requieren permisos de administrador'))
  }
}

function checkRoles (...roles) {
  return (req, _res, next) => {
    if (roles.includes(req.user.role)) {
      next()
    } else {
      next(boom.forbidden('se requieren permisos de administrador'))
    }
  }
}

module.exports = {
  checkApiKey,
  checkRoles,
  checkAdminRole
}
