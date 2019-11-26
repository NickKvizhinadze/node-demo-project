const express = require('express');
const { Customer, validate } = require('../models/customer');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const customers = await Customer.find();
        res.send(customers);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).send('Genre with given Id not found');
        }
        res.send(customer);
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
        const customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        });
        await customer.save();
        res.send(customer);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const customer = await Customer.findById(req.params.id);
        if (!customer) {
            return res.status(404).send('Genre with given Id not found');
        }
        customer.name = req.body.name;
        customer.phone = req.body.phone;
        customer.isGold = req.body.isGold;
        await customer.save();
        res.send(customer);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const result = await Customer.deleteOne({ _id: req.params.id });
        res.send(result);
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

module.exports = router;
