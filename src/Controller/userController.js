const express = require("express");
const { createAdmin, getAdminList } = require("../Service/userService");


const router = new express.Router();

//Create Admin User
router.post("/", (req, res) => {
  createAdmin(req, res)
})
router.get("/", (req, res) => {
  getAdminList(req, res)
})





module.exports = router;