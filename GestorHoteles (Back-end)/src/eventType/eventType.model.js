'use strict'

const mongoose = require('mongoose');

const eventTypeSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('EventType', eventTypeSchema);
