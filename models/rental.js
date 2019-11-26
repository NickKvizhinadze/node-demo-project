const Joi = require('joi');
const mongoose = require('mongoose');

const rentalScheme = new mongoose.Schema({
    customer: {
        type: new mongoose.Schema({
            name: { type: String, required: true, min: 3, max: 50 },
            phone: { type: String, required: true, min: 9, max: 12 }
        }),
        require: true
    },
    movie: {
        type: new mongoose.Schema({
            title: {
                type: String,
                require: true,
                min: 3,
                max: 255,
                trim: true
            },
            dailyRentalRate: { type: Number, required: true, min: 0 }
        }),
        require: true
    },
    dateOut: { type: Date, require: true, default: Date.now },
    dateReturned: { type: Date },
    rentalFee: { type: Number, min: 0 }
});

const Rental = mongoose.model('Rental', rentalScheme);

function validateRental(data) {
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    };

    const result = Joi.validate(data, schema);
    return result;
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;
