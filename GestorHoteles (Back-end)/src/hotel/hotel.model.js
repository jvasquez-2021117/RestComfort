'use strict'

const mongoose = require('mongoose');

const hotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    nOfReservations: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Hotel', hotelSchema);
