require('dotenv').config()
const db = require("../Model")
const Category = db.category;


exports.postCreateCate = (req, res) => {
  Category.create()

}

exports.getCates = (req, res) => {

}