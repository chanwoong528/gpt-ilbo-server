require('dotenv').config()
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

function generateTokens(userData) {
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
function decodeToken(token) {
  try {
    let decoded = jwt.verify(token, jwtSecret);
    return decoded.data;
  } catch (error) {
    return undefined;
  }

}


module.exports = { generateTokens, decodeToken }