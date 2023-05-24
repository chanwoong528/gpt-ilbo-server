
const express = require("express");
const { postCreateAdmin, getAdminList, patchUserActive, postLoginUser } = require("../Service/userService");


const router = new express.Router();

/**
 * @swagger
 * /user:
 *   post:
 *     tags:
 *       - "User"
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 * 
 *     responses:
 *       '201':
 *         description: Create Admin User
 *       '400':
 *         description: 
 */
router.post("/", (req, res) => {
  postCreateAdmin(req, res)
})
/**
 * @swagger
 * /user:
 *   get:
 *     tags:
 *       - "User"
 *     produces:
 *       - application/json
 *     responses:
 *       '200':
 *         description: get all the users
 *       '400':
 *         description: 
 */
router.get("/", (req, res) => {
  getAdminList(req, res)
})
router.patch("/", (req, res) => {
  patchUserActive(req, res)
})



module.exports = router;