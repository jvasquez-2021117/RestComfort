'use strict'

const express = require('express');
const api = express.Router();
const reservationController = require('./reservation.controller');

api.get('/test', reservationController.test);
api.post('/addReservation', reservationController.addReservation);
api.put('/updateReservation/:id', reservationController.updateReservation);
api.delete('/deleteReservation/:id', reservationController.deleteReservation);
api.get('/getReservation', reservationController.getReservation);
api.get('/getById/:id', reservationController.getById);
api.get('/hotelReservation/:id', reservationController.hotelReservation);
api.put('/updateState/:id', reservationController.updateState);
api.get('/getCompleted/', reservationController.getCompleted);
api.get('/getInprogress/', reservationController.getInprogress);


module.exports = api;