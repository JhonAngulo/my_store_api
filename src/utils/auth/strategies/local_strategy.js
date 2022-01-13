'use strict'

const { Strategy } = require('passport-local')
const UserService = require('../../../services/user_service')
const bcrypt = require('bcrypt')
const boom = require('@hapi/boom')

const service = new UserService()

const LocalStrategy = new Strategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    const user = await service.findByEmail({ email })

    if (!user) {
      done(boom.unauthorized(), false)
    }

    const isValidUser = await bcrypt.compare(password, user.password)

    if (!isValidUser) {
      done(boom.unauthorized(), false)
    }

    delete user.dataValues.password

    done(null, user)
  } catch (error) {
    done(error, false)
  }
})

module.exports = LocalStrategy
