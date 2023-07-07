'use strict'

const express = require('express')
const api = express.Router();
const roomTypeController = require('../roomType/roomType.controller');

api.get('/', roomTypeController.test);
api.post('/add', roomTypeController.add);
api.put('/update/:id', roomTypeController.update)
api.delete('/delete/:id', roomTypeController.delete);
api.get('/get', roomTypeController.get);
api.get('/getById/:id', roomTypeController.getById)

module.exports = api;