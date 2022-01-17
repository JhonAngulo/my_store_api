const UserService = require('../services/user_service')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { config } = require('../config/config')
const service = new UserService()
const nodemailer = require('nodemailer')

class AuthService {
  async getUser ({ email, password }) {
    const user = await service.findByEmail({ email })

    if (!user) {
      throw boom.unauthorized()
    }

    const isValidUser = await bcrypt.compare(password, user.password)

    if (!isValidUser) {
      throw boom.unauthorized()
    }

    delete user.dataValues.password
    return user
  }

  singToken ({ user }) {
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.tokenSecret)
    return {
      user,
      token
    }
  }

  async sendMail ({ email }) {
    const user = await service.findByEmail({ email })

    if (!user) {
      throw boom.unauthorized()
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPassword
      }
    })

    await transporter.sendMail({
      from: config.smtpUser,
      to: email,
      subject: 'Este es un nuevo correo',
      text: 'Hola test',
      html: '<b>Hola test</b>'
    })

    return { message: 'mail sent' }
  }
}

module.exports = AuthService
