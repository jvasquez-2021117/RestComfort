'use strict'

const mongoose = require('mongoose');

const userHotelSchema = mongoose.Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: String
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel'
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('UserHotel', userHotelSchema);
