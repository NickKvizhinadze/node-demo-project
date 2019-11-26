const express = require('express');
const { Movie, validate } = require('../models/movies');
const { Genre } = require('../models/genre');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.send(movies);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!genre) {
            return res.status(404).send('Genre with given Id not found');
        }
        res.send(movie);
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
        const genre = await Genre.findById(req.body.genreId);
        if (!genre) {
            return res.status(404).send('Invalid genre.');
        }
        const movie = new Movie({
            title: req.body.title,
            genre: genre,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        });
        movie.save();
        res.send(movie);
    } catch (ex) {
        return res.status(400).send(ex.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).send('Movie with given Id not found');
        }

        const genre = await Genre.findById(req.body.genreId);
        if (!genre) {
            return res.status(404).send('Invalid genre.');
        }

        movie.title = req.body.title;
        movie.genre = genre;
        movie.numberInStock = req.body.numberInStock;
        movie.dailyRentalRate = req.body.dailyRentalRate;

        movie.save();
        res.send(movie);
    } catch (ex) {
        return res.status(400).send(ex.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Movie.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});
module.exports = router;
