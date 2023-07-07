'use strict'

const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    nit: {
        type: String,
        required: true
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        required: true
    },
    roomPrice: {
        type: Number,
        required: true
    },
    services: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'AditionalServices',
            required: true
        }
    ],
    consumption: [ 
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Consumption',
            required: true
        }
    ],
    total: {
        type: Number,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Bill', billSchema);
