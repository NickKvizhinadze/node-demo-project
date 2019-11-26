const Joi = require('joi');
const mongoose = require('mongoose');

const { genreScheme } = require('./genre');

const movieScheme = new mongoose.Schema({
    title: { type: String, require: true, min: 3, max: 255, trim: true },
    genre: { type: genreScheme, require: true },
    numberInStock: { type: Number, required: true, min: 0 },
    dailyRentalRate: { type: Number, required: true, min: 0 }
});

const Movie = mongoose.model('Movie', movieScheme);

function validateMovie(data) {
    const schema = {
        title: Joi.string()
            .min(3)
            .max(50)
            .required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number()
            .min(0)
            .required(),
        dailyRentalRate: Joi.number()
            .min(0)
            .required()
    };

    const result = Joi.validate(data, schema);
    return result;
}

module.exports.Movie = Movie;
module.exports.validate = validateMovie;
