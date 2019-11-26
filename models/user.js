const Joi = require('joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');

const userScheme = new mongoose.Schema({
    name: { type: String, required: true, min: 5, max: 50 },
    email: { type: String, required: true, unique: true, min: 5, max: 255 },
    password: { type: String, required: true, min: 5, max: 1024 },
    isAdmin: { type: Boolean, default: false }
});

userScheme.methods.generateToken = function() {
    const token = jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        config.get('jwtPrivateKey')
    );
    return token;
};

const User = mongoose.model('User', userScheme);

function validateUser(user) {
    const schema = {
        name: Joi.string()
            .required()
            .min(3)
            .max(50),
        email: Joi.string()
            .required()
            .min(5)
            .max(255)
            .email(),
        password: Joi.string()
            .required()
            .min(5)
            .max(255)
    };
    return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validate = validateUser;
