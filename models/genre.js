const Joi = require('joi');
const mongoose = require('mongoose');

const genreScheme = new mongoose.Schema({
    name: { type: String, required: true, min: 3, max: 50 }
});

const Genre = mongoose.model('Genre', genreScheme);


function validateGenre(data) {
    const schema = {
        name: Joi.string()
            .min(3)
            .max(50)
            .required()
    };

    const result = Joi.validate(data, schema);
    return result;
}

module.exports.Genre = Genre;
module.exports.genreScheme = genreScheme;
module.exports.validate = validateGenre;
