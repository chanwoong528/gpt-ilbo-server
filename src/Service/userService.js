require('dotenv').config()
const bcrypt = require('bcrypt')

const { generateTokens, decodeToken } = require("../Util/Token")
const saltRounds = process.env.BCRYPT_SALT_ROUND

const db = require("../Model")
const User = db.user;


exports.postCreateAdmin = (req, res) => {
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
  User.findAll({
    attributes: { exclude: ['password'] },
    order: [
      ["createdAt", "desc"]
    ],
  }).then((userListData) => {
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
exports.patchUserPassword = (req, res) => {
  let userInfo = req.body.userData;

}


exports.postLoginUser = (req, res) => {
  let userInfo = req.body.userData;
  User.findOne({ where: { email: userInfo.email } }).then((userData) => {
    if (!userData) {
      return res.status(404).send({
        message: 'User does not exist.',
        code: 404,
      })
    } else {
      const comparePW = bcrypt.compare(userInfo.pw, userData.password).then((compareFlag) => {
        if (!!compareFlag) {
          let tokenData = generateTokens(userData);
          let userLoginData = {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            ...tokenData
          }
          return res.status(200).send({
            message: 'Login Successful',
            code: 200,
            data: userLoginData
          })
        } else {
          return res.status(401).send({
            message: 'User information is Wrong',
            code: 401,
          })
        }
      });

    }
  })
}
exports.getLoginStatus = (req, res) => {
  let decodedData = decodeToken(req.query.token)
  console.log("decoded Data : ", decodedData)
  if (!decodedData) {
    console.log("login again ")
    return res.status(200).send({
      message: 'Login expired.',
      code: 401,
    })
  } else {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: decodedData }
    }).then((userData) => {
      if (!!userData) {
        let newTokens = generateTokens(userData);
        let userLoginData = {
          id: userData.id,
          email: userData.email,
          name: userData.name,
          ...newTokens
        }
        return res.status(200).send({
          message: 'Login Successful',
          code: 200,
          data: userLoginData
        })
      } else {
        return res.status(200).send({
          message: 'Token Error.',
          code: 404,
        })
      }
    })
  }

}

