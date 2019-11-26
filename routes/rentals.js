const express = require('express');
const Fawn = require('fawn');
const mongoose = require('mongoose');
const { Customer } = require('../models/customer');
const { Movie } = require('../models/movies');
const { Rental, validate } = require('../models/rental');

const router = express.Router();
Fawn.init(mongoose);

router.get('/', async (req, res) => {
    try {
        const rentals = await Rental.find().sort('-dateOut');
        res.send(rentals);
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
        const customer = await Customer.findById(req.body.customerId);
        if (!customer) {
            return res.status(404).send('Invalid customer.');
        }
        const movie = await Movie.findById(req.body.movieId);
        if (!movie) {
            return res.status(404).send('Invalid movie.');
        }
        if (movie.numberInStock === 0) {
            return res.status(404).send('movie is out of stock');
        }
        const rental = new Rental({
            customer: {
                _id: customer.Id,
                name: customer.name,
                phone: customer.phone
            },
            movie: {
                title: movie.title,
                dailyRentalRate: movie.dailyRentalRate
            },
            rentalFee: movie.dailyRentalRate
        });

        new Fawn.Task()
            .save('rentals', rental)
            .update(
                'movies',
                { _id: movie._id },
                {
                    $inc: { numberInStock: -1 }
                }
            )
            .run();

        res.send(rental);
    } catch (ex) {
        return res.status(500).send('something failed.');
    }
});

module.exports = router;
