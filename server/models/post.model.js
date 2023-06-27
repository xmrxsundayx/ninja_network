const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: [true, "Post can not be empty!"],
        minlength: [2, "Post must be at least 2 characters long!"],
        maxlength: [255, "Post can not be longer than 255 characters!"]
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    tags: [{
        type: String,
    }]
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;