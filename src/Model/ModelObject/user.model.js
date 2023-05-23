module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define('user', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      require: true,
    },
    email: {
      type: Sequelize.STRING,
      require: true,
    },
    password: {
      type: Sequelize.STRING,
      require: true,
    },
    role: {
      //role:  user, admin 
      type: Sequelize.STRING,
      require: true,
      default: "user"
    },
    active: {
      type: Sequelize.BOOLEAN,
      require: true,
      defaultValue: false
    },
    verified: {
      type: Sequelize.BOOLEAN,
      require: true,
      defaultValue: false
    },
    forgot_pw: {
      type: Sequelize.BOOLEAN,
      require: true,
      defaultValue: false
    }
  })

  return user
}