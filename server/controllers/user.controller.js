const User = require('../models/user.model')
const secret = process.env.secret_key
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

module.exports = {
    register: async (req, res) => {
        try {
            const submitEmail = await User.findOne({ email: req.body.email });
            if (submitEmail) {
                res.status(400).json({
                    message: ' Oops! Email already exists! '
                });
            } else {
                const newUser = await User.create(req.body);
                const userToken = jwt.sign({ _id: newUser._id, email: newUser.email }, secret, { expiresIn: "2h" });
                console.log(userToken)
                res.status(201).cookie('usertoken', userToken, { httpOnly: true, maxAge: 2 * 60 * 60 * 100 }).json({
                    message: "Success!",
                    user: newUser
                });
            }
        } catch (err) {
            return res.status(400).json(err);
        }
    },

    login: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const correctPassword = await bcrypt.compare(req.body.password, user.password);
                if (correctPassword) {
                    const userToken = jwt.sign({ _id: user._id, email: user.email }, secret, { expiresIn: '4h' });
                    res.status(201).cookie('usertoken', userToken, { httpOnly: true, maxAge: 2 * 60 * 60 * 100 }).json({
                        message: "Success!",
                        user: user,
                    })
                }
                else {
                    res.status(400).json({
                        message: "Unsuccessful login, try again or register!"
                    });
                }
            }
            else {
                res.status(400).json({
                    message: 'Unsuccessful login attempt, try again or register'
                })
            }
        }
        catch (err) {
            res.status(400).json({ error: err });
        }
    },

    logout: (req, res) => {
        console.log("logging user out")
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },

    logged: async (req, res) => {
        try {
            console.log('this is the cookie',req.cookies.usertoken )
            const user = jwt.verify(req.cookies.usertoken, secret);
            console.log('this is the user', user)
            const currentUser = await User.findOne({ _id: user._id });
            console.log('this is the current user', currentUser)
            res.json(currentUser)
        } catch (err) {
            res.status(400).json({ err: 'Please log in' })
        }
    },

    updateUser: (req, res) => {
            console.log('updating user:', req.body);
            User.updateOne({ _id: req.params.id }, req.body , { new: true })
            .then((result)=>{
                res.json(result)
            }).catch((err)=>{
                console.log(err)
                res.status(400).json(err)
            })
        },


    getOneUser: async (req, res) => {
        console.log('getting one user: ', req.params.id)
        User.findOne({ _id: req.params.id })
            .then(e => res.json(e))
            .catch(err => res.status(400).json(err))
    },

    getAllUsers: async (req, res) => {
        console.log('getting all users')
        User.find()
            .then(e => res.json(e))
            .catch(err => res.status(400).json(err))
    }
}