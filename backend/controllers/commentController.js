const Comment = require("../models/Comment");
const Post = require("../models/Post");
const User = require("../models/User");
const { ObjectId } = require("mongoose").Schema.Types;

const createComment = async (req, res) => {
  const { content, postId } = req.body;
  const userId = req.user.userId;

  if (!content) {
    return res.status(400).json({ message: "Comment content is required" });
  }

  try {
    const newComment = new Comment({
      content,
      author: userId,
      post: postId,
    });

    await newComment.save();

    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
      $inc: { commentsCount: 1 },
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getCommentsByPostId = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId })
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const deleteComment = async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user.userId;

  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.author.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized action" });
    }

    await comment.remove();

    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: commentId },
      $inc: { commentsCount: -1 },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  createComment,
  getCommentsByPostId,
  deleteComment,
};
