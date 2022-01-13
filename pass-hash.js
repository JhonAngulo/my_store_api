'use strict'

const bcrypt = require('bcrypt')
const myPassowrd = 'i am passwod'
let hash = ''

async function hashPassword () {
  hash = await bcrypt.hash(myPassowrd, 10)
  console.log(hash)
}

async function verifyPassword () {
  const isMatch = await bcrypt.compare('manuel', hash)
  console.log(isMatch)
}

hashPassword()

setTimeout(() => {
  verifyPassword()
}, 5000)
