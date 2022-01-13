'use strict'

const express = require('express')

const productsRouter = require('./products_router')
const categoriesRouter = require('./categories_router')
const usersRouter = require('./users_router')
const orderRouter = require('./orders_router')
const customersRouter = require('./customers_router')
const authRouter = require('./auth-router')

function routerApi (app) {
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/auth', authRouter)
  router.use('/products', productsRouter)
  router.use('/categories', categoriesRouter)
  router.use('/users', usersRouter)
  router.use('/orders', orderRouter)
  router.use('/customers', customersRouter)
}

module.exports = routerApi
