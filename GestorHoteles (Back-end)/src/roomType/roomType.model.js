'use strict'

const mongoose = require('mongoose');

const roomTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('RoomType', roomTypeSchema);
