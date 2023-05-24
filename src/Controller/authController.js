
const express = require("express");
const { postLoginUser } = require("../Service/userService");


const router = new express.Router();


router.post("/", (req, res) => {
  postLoginUser(req, res)
})


module.exports = router;