'use strict'

const mongoose = require('mongoose');

const reservationSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true,
        default: 'No event'
    },
    date: {
        type: Date,
        required: true
    },
    adminHotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserHotel',
        required: true
    },
    State:{
        type: String,
        required: true,
        default: 'In progress'
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('Reservation', reservationSchema);