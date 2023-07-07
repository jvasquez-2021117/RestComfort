'use strict'

const express = require('express');
const api = express.Router();
const eventTypeController = require('./eventType.controller');

api.get('/test', eventTypeController.test);
api.post('/add', eventTypeController.addEventType);
api.put('/update/:id', eventTypeController.updateEventType);
api.delete('/delete/:id', eventTypeController.deleteEventType);
api.get('/get', eventTypeController.getEventsTypes)
api.get('/getByid/:id', eventTypeController.getEventTypeById);

module.exports = api;