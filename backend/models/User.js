const mongoose = require("mongoose")
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        "username": {
            type: String,
            unique: true,
        },
        "password": {
            type: String,
            required: true
        },
        "avatarURL": {
            type:String
        },
        "email": {
            type: String,
            required: true
        },
        "posts": [
            {
                type: Schema.Types.ObjectId,
                ref: "Posts",
            }]

    },
    { timestamps: true }
)
const User = mongoose.model("Users", userSchema)
module.exports = User