'use strict'

const express = require('express');
const api = express.Router();
const roomController = require('./room.controller');

api.get('/', roomController.test);
api.post('/add', roomController.add);
api.put('/update/:id', roomController.update);
api.delete('/delete/:id', roomController.delete);
api.get('/get', roomController.get);
api.get('/getById/:id', roomController.getById);
api.get('/countRoomsAvailability', roomController.countRoomsAvailability);
api.get('/getByAvailability', roomController.getByAvailability);
api.get('/searchRoomByHotel/:id', roomController.searchRoomByHotel)


module.exports = api;