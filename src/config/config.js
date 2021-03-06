'use strict'

require('dotenv').config()

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  tokenSecret: process.env.TOKEN_SECRET,
  smtpUser: process.env.STMP_USER,
  smtpPassword: process.env.SMTP_PASSWORD,
  emailUserTest: process.env.USER_EMAIL
}

module.exports = { config }
