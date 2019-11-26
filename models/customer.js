const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model(
    'Customer',
    new mongoose.Schema({
        name: { type: String, required: true, min: 3, max: 50 },
        phone: { type: String, required: true, min: 9, max: 12 },
        isGold: { type: Boolean, default: false }
    })
);

function validateCustomer(data) {
    const schema = {
        name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        phone: Joi.string()
            .min(9)
            .max(12)
            .required(),
        isGold: Joi.boolean()
    };

    return Joi.validate(data, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;
