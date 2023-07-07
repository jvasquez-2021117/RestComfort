'use strict'

const mongoose = require('mongoose');

const consumptionSchema = mongoose.Schema({
    product: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Consumption', consumptionSchema);