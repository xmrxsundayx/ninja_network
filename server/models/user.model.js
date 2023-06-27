const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "First name must be at least 2 characters long"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [2, "Last name must be at least 2 characters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        minlength: [5, "Email must be at least 5 characters long"],
        unique: [true, "Email already exists"],
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    jobTitle: {
        type: String,
    },
    languages: {
        type: [],
    },
    profilePhoto:
    {
        type: String,
        default: "http://res.cloudinary.com/dijdukoam/image/upload/v1687891822/vcqb6zt9wfgg8rldl7dx.jpg"
    },
    location: {
        type: String,
    },
    links: {
        type: [],
    },
    friends: {
        type: [],
    },
    // friendRequests: { 
    //     type: Array,
    // },
    // friendRequestsSent: {
    //     type: Array,
    // },
    // friendRequestsReceived: {
    //     type: Array,
    // },
    posts: {
        type: [],
    }

}, {timestamps: true});

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function (next) { 
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});


module.exports = mongoose.model('User', UserSchema);

