const express = require('express');
const Joi = require('Joi');
const _ = require('lodash');
const { User } = require('../models/user');
const { compare } = require('../helpers/hash');

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(400).send('Invalid email or password.');
        }

        const isPasswordValid = await compare(user.password, req.body.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid email or password.');
        }

        const token = user.generateToken();

        res.send(token);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

function validate(user) {
    const schema = {
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

module.exports = router;
