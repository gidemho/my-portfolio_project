const Post = require("../models/Post")
const { ObjectId } = require("mongoose").Types
const createPost = async (req, res) => {
    const { title, description, body } = req.body
    console.log(req.user)
    if (!title) {
        res.status(400).json({ "message": "You need to add a title for your post" })
    }
    if (!description) {
        res.status(400).json({ "message": "You need to add a description for your post" })
    }
    if (!body) {
        res.status(400).json({ "message": "Your post needs a body" })
    }
    console.log(req.user)
    const newPost = new Post({
        title,
        description,
        body,
        author: req.user.userId
    })
    await newPost.save()
    res.status(200).json({ "message": "New post created" })

}
const getAllPosts = async (req, res) => {
    const posts = await Post.find({}).populate('author', 'username email')
    return res.status(200).json({ posts })

}
const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const postId = new ObjectId(id);
        const post = await Post.findById(postId);

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
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
const getPostById = async (req, res) => {
    const { id } = req.params
    const post = await Post.findById(id)
    if (!post) {
        return res.status(404).json({ message: "No post exists with that ID" })
    }
    return res.status(200).json({ post })
}

module.exports = {
    createPost,
    getAllPosts,
    likePost,
    getPostById
}