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
            const user = jwt.verify(req.cookies.usertoken, secret);
            const currentUser = await User.findOne({ _id: user._id });
            res.json(currentUser)
        } catch (err) {
            res.status(400).json({ err: 'Please log in' })
        }
    },
// new code------------------------------
    updateUser: async (req, res) => {
        try {
            console.log('updating user:', req.body);
            const updateUser = await User.findOneAndUpdate({ _id: req.params.id }, req.body,{profilePhoto: profilePhoto}, { new: true });
            res.json(updateUser);
        } catch (error) {
            console.log('error updating user:', error);
            res.status(400).json(error);
        }
    },

// old code-----------------------------

    // updateUser: async (req, res) => {
    //     try {
    //         console.log('updating user:', req.body);
    //         const updateUser = await User.findOneAndUpdate({ _id: req.params.id }, req.body,{profilePhoto: profilePhoto}, { new: true });
    //         res.json(updateUser);
    //     } catch (error) {
    //         console.log('error updating user:', error);
    //         res.status(400).json(error);
    //     }
    // },

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