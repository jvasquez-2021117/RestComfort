'use strict'

const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    noGuest:{
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    roomType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RoomType',
        required: true
    },
    availability: {
        type: String,
        required: true,
        default: 'Disponible'
    },
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel',
        required: true
    }
    
},{
    versionKey: false
});

module.exports = mongoose.model('Room', roomSchema);