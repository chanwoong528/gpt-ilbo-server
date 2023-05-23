module.exports = (sequelize, Sequelize) => {
  const article = sequelize.define('article', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    release_date: {
      type: Sequelize.UUID,
      required: true,
    },
    title_kr: {
      type: Sequelize.STRING,
      require: true,
    },
    title_en: {
      type: Sequelize.STRING,
      required: true,
    },
    content_kr: {
      type: Sequelize.STRING,
      required: true,
    },
    content_en: {
      type: Sequelize.STRING,
      defaultValue: null,
    },
  })

  return article
}