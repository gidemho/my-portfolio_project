const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const crypto = require("node:crypto");

// Generate Gravatar URL based on email
function getGravatarUrl(email, size) {
    const trimmedEmail = email.trim().toLowerCase();
    const hash = crypto.createHash('md5').update(trimmedEmail).digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=identicon`;
}

// Create a new user
const createUser = async (req, res) => {
    let { username, password, email } = req.body;
    
    if (!username || username.length <= 6) {
        return res.status(400).json({ message: "Username must be at least 6 characters long" });
    }

    if (!password || password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ message: "There exists a user with this username" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const profpic = getGravatarUrl(email, 80);

    const newUser = new User({
        username,
        avatarURL: profpic,
        password: hashedPassword,
        email
    });

    try {
        await newUser.save();
        return res.status(201).json({ message: "User created successfully!" });
    } catch (e) {
        return res.status(500).json({ message: "Error occurred while creating user", error: e.message });
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || email.length < 6) {
        return res.status(400).json({ message: "Email must be at least 6 characters long" });
    }

    if (!password || password.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long" });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Wrong credentials, try again" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).json({ message: "Wrong credentials, try again" });
    }

    const token = jwt.sign(
        {
            userId: user._id,
            username:user.username,
            profpic: user.avatarURL
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.status(200).json({ message: "Logged in successfully!", token });
};

// Log out a user
const logOutUser = (req, res) => {
    return res.status(200).json({ message: "Logout successful!" });
};


const getProfile = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User profile not found" });
        }

        const userProfile = {
            username: user.username,
            email: user.email,
            numberofPosts: user.posts.length
        };
        return res.status(200).json(userProfile);
    } catch (error) {
        return res.status(500).json({ message: "Error occurred while fetching profile", error: error.message });
    }
};

module.exports = {
    createUser,
    loginUser,
    logOutUser,
    getProfile
};
