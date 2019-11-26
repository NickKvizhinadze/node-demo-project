const express = require('express');
const { Genre, validate } = require('../models/genre');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const router = express.Router();

router.get('/', async (req, res) => {
    throw new Error('Could not get the genres');
    const genres = await Genre.find();
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        return res.status(404).send('Genre with given Id not found');
    }
    res.send(genre);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    const genre = new Genre({
        name: req.body.name
    });
    await genre.save();
    res.send(genre);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        return res.status(404).send('Genre with given Id not found');
    }
    genre.name = req.body.name;
    await genre.save();
    res.send(genre);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const result = await Genre.deleteOne({ _id: req.params.id });
    res.send(result);
});

module.exports = router;
