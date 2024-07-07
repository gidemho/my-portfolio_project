const Post = require("../models/Post");
const mongoose = require("mongoose");

const createPost = async (req, res) => {
    const { title, description, body } = req.body;

    if (!title) {
        return res.status(400).json({ message: "You need to add a title for your post" });
    }
    if (!description) {
        return res.status(400).json({ message: "You need to add a description for your post" });
    }
    if (!body) {
        return res.status(400).json({ message: "Your post needs a body" });
    }

    const newPost = new Post({
        title,
        description,
        body,
        author: req.user.userId
    });

    try {
        await newPost.save();
        return res.status(201).json({ message: "New post created" });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred while creating post", error: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({}).populate('author', 'username email');
        return res.status(200).json({ posts });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred while fetching posts", error: error.message });
    }
};

const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id, typeof(id))
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid post ID' });
        }
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const userId = req.body.userId;
        const liked = post.likers.includes(userId);

        if (liked) {
            post.likers.pull(userId);
        } else {
            post.likers.push(userId);
        }

        await post.save();
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }
};

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid post ID' });
        }
        const post = await Post.findById(id).populate('author', 'username email');

        if (!post) {
            return res.status(404).json({ message: "No post exists with that ID" });
        }

        return res.status(200).json({ post });
    } catch (error) {
        return res.status(500).json({ message: "Error occurred while fetching post", error: error.message });
    }
};

module.exports = {
    createPost,
    getAllPosts,
    likePost,
    getPostById
};
