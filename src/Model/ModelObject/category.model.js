module.exports = (sequelize, Sequelize) => {
  const category = sequelize.define('category', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      require: true,
    },
    description: {
      type: Sequelize.STRING,
      require: true,
    },
  })

  return category
}