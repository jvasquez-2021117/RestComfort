'use strict'

const express = require('express');
const api = express.Router();
const billController = require('./bill.controller');

api.get('/test', billController.test);
api.post('/addBill', billController.addBill);
api.put('/updateBill/:id', billController.updateBill);
api.delete('/deleteBill/:id', billController.deleteBill);
api.get('/getBill', billController.getBill);
api.get('/getById/:id', billController.getById);


module.exports = api;