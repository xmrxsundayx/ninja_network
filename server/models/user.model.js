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
        default: ["Edit profile to add languages"]
    },
    profilePhoto:
    {
        type: String,
        default: "https://res.cloudinary.com/dijdukoam/image/upload/v1687903553/l97pm0jdnvfvhpngtuza.png"
    },
    location: {
        type: String,
        default: "Edit profile to add location"
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
//     posts: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Post",
// }]

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

const User = mongoose.model('User', UserSchema);

module.exports = User;

