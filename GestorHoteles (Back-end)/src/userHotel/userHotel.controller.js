'use strict'

const UserHotel = require('./userHotel.model');
const { encrypt, checkPassword } = require('../utils/validate');


exports.test = (req, res) => {
    return res.send({ message: 'Test function running UserHotel Complete' });
}

exports.addUserHotel = async (req, res) => {
    try {
        let data = req.body;
        data.password = await encrypt(data.password);
        data.role = 'ADMIN-HOTEL';
        let existUser = await UserHotel.findOne({ email: data.email });
        if (existUser) return res.send({ message: 'This email already exists' });
        let user = new UserHotel(data);
        await user.save();
        return res.send({ message: 'Account created succesfully' });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error adding Admin Hotel' });
    }
}

exports.updateUserHotel = async (req, res) => {
    try {
        let idUserHotel = req.params.id;
        let data = req.body
        let existUser = await UserHotel.findOne({ email: data.email });
        if (existUser) return res.send({ message: 'This email already exists' });
        let updatedUserHotel = await UserHotel.findOneAndUpdate(
            { _id: idUserHotel },
            data,
            { new: true }
        )
        if (!updatedUserHotel) return res.send({ message: 'User not found and not update' });
        return res.status(201).send({ message: 'User updated' })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error updating Admin Hotel' });
    }
}

exports.deleteUserHotel = async (req, res) => {
    try {
        let idUserHotel = req.params.id;
        let userDeleted = await UserHotel.findOneAndDelete({ _id: idUserHotel });
        if (!userDeleted) return res.send({ message: 'Account not found and not deleted' });
        return res.send({ message: 'User deleting succesfully' });
    } catch (e) {
        console.error(e);
        return res.status(404).send({ message: 'Error deleting user' });
    }
}

exports.viewUsersHotel = async (req, res) => {
    try {
        let usersHotel = await UserHotel.find().populate('hotel');
        return res.send({ usersHotel });
    } catch (e) {
        console.error(e);
        return res.status(404).send({ message: 'Error not view users' });
    }
}

exports.getById = async (req, res) => {
    try {
        let { id } = req.params
        let userHotel = await UserHotel.findOne({ _id: id });
        return res.status(200).send({ userHotel });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error getting' });
    }
}