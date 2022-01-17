'use strict'

const AuthService = require('../services/auth_service')
const router = require('express').Router()
const passport = require('passport')
const authService = new AuthService()

router.get('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    const { user } = req
    try {
      const response = authService.singToken({ user })
      res.json(response)
    } catch (error) {
      next(error)
    }
  })

router.post('/recovery', async (req, res, next) => {
  try {
    const { email } = req.body
    const rta = await authService.sendMail({ email })
    res.json(rta)
  } catch (error) {
    next(error)
  }
})

module.exports = router
