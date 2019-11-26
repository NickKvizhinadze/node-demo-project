const express = require('express');
const _ = require('lodash');
const { User, validate } = require('../models/user');
const { encrypt } = require('../helpers/hash');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        res.send(user);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

router.post('/', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        let user = await User.findOne({ email: req.body.email });

        if (user) {
            return res.status(400).send('User already registered.');
        }

        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        user.password = await encrypt(user.password);
        await user.save();
        const token = user.generateToken();

        res.header('x-auth-token', token).send(
            _.pick(user, ['_id', 'name', 'email'])
        );
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

module.exports = router;
