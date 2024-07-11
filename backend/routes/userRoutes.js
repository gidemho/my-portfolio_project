const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController")
const authMiddleware = require("../utils/authMiddleware");

userRouter.post("/api/v1/auth/login", userController.loginUser);
userRouter.get("/api/v1/auth/logout", userController.logOutUser);
userRouter.get("/api/v1/user/profile/:id", userController.getProfile);

/* Routes for posts */
userRouter.post("/api/v1/user/post", authMiddleware, postController.createPost);
userRouter.get("/api/v1/posts/:id", postController.getPostById);
userRouter.get("/api/v1/allposts", postController.getAllPosts);
userRouter.post("/api/v1/posts/like/:id", postController.likePost);

/*Routes for comments */
userRouter.get("/api/v1/comment/:postId", authMiddleware, commentController.getCommentsByPostId)
userRouter.post("/api/v1/comment/create", authMiddleware, commentController.createComment)
userRouter.delete("/api/v1/comment/delete/:commentId", authMiddleware, commentController.deleteComment)

module.exports = userRouter;
