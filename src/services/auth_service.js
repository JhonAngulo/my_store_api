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
    delete user.dataValues.recoveryToken
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

  async sendRecovery ({ email }) {
    const user = await service.findByEmail({ email })

    if (!user) {
      throw boom.unauthorized()
    }

    const payload = {
      sub: user.id
    }

    const token = jwt.sing(payload, config.tokenSecret, { expiresIn: '15min' })
    const link = `http://myfront.com/recovery?token=${token}`
    await service.update(user.id, { recoveryToken: token })

    const infoEmail = {
      from: config.smtpUser,
      to: email,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa a este link para recuperar la contraseña ${link} </b>`
    }

    const rta = await this.sendMail({ infoEmail })
    return rta
  }

  async changePassword ({ token, newPassword }) {
    try {
      const payload = jwt.verify(token, config.tokenSecret)
      const user = await service.findOne({ id: payload.sub })
      if (user.recoveryToken !== token) {
        throw boom.unauthorized()
      }

      const hash = await bcrypt.hash(newPassword, 10)

      await service.update(user.id, { password: hash, recoveryToken: null })

      return {
        message: 'password changed'
      }
    } catch (error) {
      throw boom.unauthorized()
    }
  }

  async sendMail ({ infoEmail }) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.smtpUser,
        pass: config.smtpPassword
      }
    })

    await transporter.sendMail(infoEmail)

    return { message: 'mail sent' }
  }
}

module.exports = AuthService
