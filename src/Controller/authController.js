
const express = require("express");
const { postLoginUser, getLoginStatus } = require("../Service/userService");


const router = new express.Router();


router.post("/", (req, res) => {
  postLoginUser(req, res)
})
router.get("/", (req, res) => {
  getLoginStatus(req, res)
})


module.exports = router;