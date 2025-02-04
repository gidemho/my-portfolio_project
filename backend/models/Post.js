const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }],
    likers: [{
      type: Schema.Types.ObjectId,
      ref: "Users"
    }]
  },
  { timestamps: true }
);

const Post = mongoose.model("Posts", postSchema);
module.exports = Post;
