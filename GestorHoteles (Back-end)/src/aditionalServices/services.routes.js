'use strict'

const express = require('express');
const api = express.Router();
const servicesController = require('./services.controller');

api.get('/test', servicesController.test);
api.post('/addServices', servicesController.addServices);
api.put('/updateService/:id', servicesController.updateService);
api.get('/getService', servicesController.getService);
api.get('/getById/:id', servicesController.getById);
api.delete('/delete/:id', servicesController.delete)

module.exports = api;