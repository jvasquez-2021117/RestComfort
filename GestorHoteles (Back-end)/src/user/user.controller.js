'use strict'

const User = require('./user.model');
const UserHotel = require('../userHotel/userHotel.model')
const { encrypt, checkPassword, validateData } = require('../utils/validate');
const { createToken } = require('../services/jwt')

exports.test = (req, res) => {
    return res.send({ message: 'Test function running User' });
}

exports.adminDefault = async (req, res) => {
    try {
        let admin = {
            name: 'Admin',
            surname: 'Admin',
            password: '123',
            email: 'admin@gmail.com',
            phone: '12345678',
            role: 'ADMIN-APP',
        }
        admin.password = await encrypt(admin.password);
        let existAdmin = await User.findOne({ email: admin.email });
        if (existAdmin) return
        let adminDefault = new User(admin);
        await adminDefault.save();
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error creating admin default' });
    }
}

exports.register = async (req, res) => {
    try {
        let data = req.body;
        data.password = await encrypt(data.password);
        data.role = 'CLIENT';
        if (data.name == '' || data.email == '' || data.surname == '' || data.password == '') return res.send({ message: 'Check that all fields are complete' })
        let existUser = await User.findOne({ email: data.email });
        if (existUser) return res.send({ message: 'This email already exists' });
        let user = new User(data);
        await user.save();
        return res.send({ message: 'Account created succesfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error creating account', });
    }
}

exports.login = async (req, res) => {
    try {
        let data = req.body;
        if (data.email == '' || data.password == '') return res.send({ message: 'Check that all fields are complete' })
        let msg = validateData(data.email, data.password);
        if (msg) return res.status(400).send({ message: msg });
        let user = await User.findOne({ email: data.email });
        let userHotel = await UserHotel.findOne({ email: data.email });
        console.log(userHotel);
        if (user && await checkPassword(data.password, user.password)) {
            let token = await createToken(user);
            let userLogged = {
                id: user._id,
                user: user._id,
                name: user.name,
                surname: user.surname,
                role: user.role
            }
            return res.send({ message: 'Use logged succesfully', token, userLogged });
        } else if (userHotel && await checkPassword(data.password, userHotel.password))
        console.log(checkPassword(data.password, userHotel.password)); {
            let token = await createToken(userHotel);
            let userLogged = {
                id: userHotel._id,
                user: userHotel._id,
                name: userHotel.name,
                surname: userHotel.surname,
                role: userHotel.role
            }
            return res.send({ message: 'Use logged succesfully', token, userLogged });
        }
        return res.status(404).send({ message: 'Invalid Credentials' });
    } catch (e) {
        console.error(e);
        return res.status(404).send({ message: 'Error not logged' });
    }
}

exports.viewUsers = async (req, res) => {
    try {
        let users = await User.find();
        return res.send({ users });
    } catch (e) {
        console.error(e);
        return res.status(404).send({ message: 'Error not view users' });
    }
}

exports.updateUser = async (req, res) => {
    try {
        let idUser = req.params.id;
        let data = req.body;
        if (data.password != null) return res.send({ message: 'Password not update' });
        let adminUser = User.findOne({ role: "ADMIN-APP" });
        if (idUser == adminUser._id) return res.send({ message: 'Admin not update' });
        let existUser = await User.findOne({ email: data.email });
        if (existUser) return res.send({ message: 'This email already exists' });
        let updatedUser = await User.findOneAndUpdate(
            { _id: idUser },
            data,
            { new: true }
        )
        let userLogged = {
            name: updatedUser.name,
            surname: updatedUser.surname
        }
        if (!updatedUser) return res.send({ message: 'User not found and not update' });
        return res.send({ message: 'User updated', idUser, userLogged })
    } catch (e) {
        console.error(e);
        return res.status(404).send({ message: 'Error updating user' });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        let idUser = req.params.id;
        let adminUser = await User.findOne({ role: "ADMIN-APP" });
        if (idUser == adminUser._id) return res.send({ message: 'Admin not deleted' });
        let userDeleted = await User.findOneAndDelete({ _id: idUser });
        if (!userDeleted) return res.send({ message: 'Account not found and not deleted' });
        return res.send({ message: 'User deleting succesfully' });
    } catch (e) {
        console.error(e);
        return res.status(404).send({ message: 'Error deleting user' });
    }
}

exports.getById = async (req, res) => {
    try {
        let { id } = req.params;
        let accountUser = await User.findOne({ _id: id })
        return res.status(200).send({ accountUser })
    } catch (e) {
        console.error(e);
        return res.status(404).send({ message: 'Error getting user' });
    }
}