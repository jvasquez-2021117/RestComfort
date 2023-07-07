'use strict'

const mongoose = require('mongoose');

const servicesSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    price: {
        type: String,
        required: true
    }
}, {
    versionKey: false
});

module.exports = mongoose.model('AditionalServices', servicesSchema);