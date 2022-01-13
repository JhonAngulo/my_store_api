'use strict'

const { Sequelize } = require('sequelize')

const { config } = require('./../config/config')
const setupModels = require('./../db/models')

const options = {
  dialect: 'postgres',
  logging: (x) => {
    if (!config.isProd) {
      // eslint-disable-next-line no-console
      console.log(x)
    }
  }
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const sequelize = new Sequelize(config.dbUrl, options)

setupModels(sequelize)

module.exports = sequelize
