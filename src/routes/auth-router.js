'use strict'

const router = require('express').Router()
const passport = require('passport')

router.get('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    res.json(req.user)
  })

module.exports = router
