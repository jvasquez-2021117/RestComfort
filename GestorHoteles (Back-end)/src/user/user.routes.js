'use strict'

const userController = require('./user.controller');
const express = require('express');
const api = express.Router();

api.get('/test', userController.test);
api.get('/get', userController.viewUsers);
api.post('/register', userController.register);
api.post('/login', userController.login);
api.put('/update/:id', userController.updateUser);
api.delete('/delete/:id', userController.deleteUser);
api.get('/getById/:id', userController.getById);

module.exports = api;