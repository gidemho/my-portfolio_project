const express = require("express")
const userRouter = express.Router()
const userController = require("../controllers/userController")

userRouter.post("/api/v1/auth/login", userController.loginUser)
userRouter.get("/api/v1/auth/logout", userController.logOutUser)
userRouter.get("/api/v1/user/profile/:id", userController.getProfile)
module.exports = userRouter