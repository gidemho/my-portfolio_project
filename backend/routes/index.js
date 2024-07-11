const express = require("express")
const indexRouter = express.Router()
const userController = require("../controllers/userController")
indexRouter.post("/api/v1/auth/register", userController.createUser)

module.exports = indexRouter