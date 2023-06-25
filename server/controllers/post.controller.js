const Post = require('../models/post.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const secret = process.env.secret_key;

module.exports = {
    getAllPosts: (req, res) => {
        Post.find()
            .populate('creator', 'firstName lastName')
            // .populate('comments')
            // .populate('likes')
            .sort({ createdAt: 'desc' })
            .then( e => res.json(e))
            .catch(err => res.status(400).json({message: "Error getting all posts!", error: err}));
    },
    getUserPosts: (req, res) => {
        const userToken = jwt.verify(req.cookies.usertoken, secret)
        Post.find({ creator: userToken._id })
            .populate('creator', 'firstName lastName')
            // .populate('comments')
            // .populate('likes')
            .sort({ createdAt: 'desc' })
            .then( e => res.json(e))
            .catch(err => res.status(400).json({message: "Error getting this users posts!", error: err}));
    },
    createPost: (req, res) => {
        const userToken = jwt.verify(req.cookies.usertoken, secret);
        Post.create({ ...req.body, creator: userToken._id })
            .then( e => res.status(201).json(e))
            .catch(err => {
                console.log(err);
                res.status(400).json({message: "Error creating post!", errors: err.errors});
            });
    },
    updatePost: async (req, res) => {
        try {
            const userToken = jwt.verify(req.cookies.usertoken, secret);
            const post = await Post.findOneAndUpdate(
                { _id: req.params.id, creator: userToken._id },
        req.body, { new: true, runValidators: true })
        .populate('creator', 'firstName lastName');
        res.json(post);
    } catch (err) {
        console.log(err);
        res.status(400).json({message: "Error updating post!", errors: err.errors});
    }
    },
    
    deletePost: (req, res) => {
        Post.deleteOne({ _id: req.params.id })
            .then( e => res.json(e))
            .catch(err => res.status(400).json({message: "Error deleting post!", errors: err.errors}));
    },
}