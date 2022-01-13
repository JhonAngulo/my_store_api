'use strict'

const passport = require('passport')

const LocalStrategy = require('./strategies/local_strategy')

passport.use(LocalStrategy)
