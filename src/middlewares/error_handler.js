'use strict'

const { ValidationError } = require('sequelize')

function logErrors (err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err)
  next(err)
}

function errorHandler (err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  })
}

function boomErrorHandler (err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}

function ormErrorHandler (err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.errors[0].message,
      errors: err.errors[0].type
    })
  } else {
    next(err)
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
