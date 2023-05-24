require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

function generateTokens(userData) {
  console.log("######  ", userData.id)
  let accessToken = jwt.sign(
    {
      data: userData.id,
    },
    jwtSecret,
    { expiresIn: 60 * 30 },
  )
  let refreshToken = jwt.sign(
    {
      data: userData.id,
    },
    jwtSecret,
    { expiresIn: '365d' },
  )
  return { accessToken, refreshToken }
}

module.exports = { generateTokens }