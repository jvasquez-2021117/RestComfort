'use strict'

const express = require('express');
const api = express.Router();
const hotelController = require('./hotel.controller');
const connectMultiparty = require('connect-multiparty');
const upload = connectMultiparty({ uploadDir: './uploads/hotels' });

api.get('/test', hotelController.test);
api.post('/addHotel', hotelController.addHotel);
api.put('/updateHotel/:id', hotelController.updateHotel);
api.delete('/deleteHotel/:id', hotelController.deleteHotel);
api.get('/getHotel', hotelController.getHotel);
api.get('/getById/:id', hotelController.getById);
api.put('/uploadImg/:id', upload, hotelController.updateImg);
api.get('/getHotelsData', hotelController.getHotelsData);


module.exports = api;