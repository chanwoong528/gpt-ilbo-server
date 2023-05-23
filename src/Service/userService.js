require('dotenv').config()
const db = require("../Model")
const User = db.user;
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRounds = process.env.BCRYPT_SALT_ROUND
const compareText = process.env.BCRYPT_COMPARE_TEXT
const jwtSecret = process.env.JWT_SECRET


exports.createAdmin = (req, res) => {
  let password = req.body.userData.pw ? req.body.userData.pw : "1234"
  const hashedPw = bcrypt.hash(password, parseInt(saltRounds), function (err, hash) {
    if (err) {
      console.warn("hashedPw Gen[error]: ", err);
      throw new Error("hashedPw Gen[error]: ", err);
    } else {
      const user = {
        name: req.body.userData.name,
        email: req.body.userData.email,
        password: hash,
        role: req.body.userData.role
      }
      User.create(user).then((userData) => {
        return res.status(201).send({
          message: 'new user created',
          code: 201,
        })
      }).catch((err) => {
        console.warn("User.create[error]: ", err)
        return res.status(400).send({
          message: 'new user created',
          code: 400,
        })
      })
    }
  })
}

exports.getAdminList = (req, res) => {
  User.findAll({ exclude: ['password'] }).then((userListData) => {
    return res.status(200).send({
      message: 'user list responded',
      code: 200,
      data: userListData
    })
  }).catch((err) => {
    console.warn("User.findAll[error]: ", err)
    return res.status(400).send({
      message: 'Something Wrong with Server',
      code: 400,
    })
  })
}

exports.patchUserActive = (req, res) => {

  User.update({ active: req.body.toggleData.active }, { where: { id: req.body.toggleData.userId } })
    .then((userUpdateData) => {
      return res.status(200).send({
        message: 'updated user active',
        code: 204,
      })
    }).catch((err) => {
      console.warn("User.patchUserActive[error]: ", err)
      return res.status(400).send({
        message: 'Something Wrong with Server',
        code: 400,
      })
    })
}

