'use strict'

const Consumption = require('./consumption.model');

exports.test = (req, res) => {
    return res.send({ message: 'test fuction is running' });
}

exports.addConsumption = async (req, res) => {
    try {
        let data = req.body;
        let consumptionExist = await Consumption.findOne({ product: data.product });
        if (consumptionExist) return res.send({ message: 'Consumption already exists' });
        let consumption = new Consumption(data);
        await consumption.save();
        return res.status(201).send({ message: 'Consumption added successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding consumption' });
    }
}

exports.updateConsumption = async (req, res) => {
    try {
        let consumptionId = req.params.id;
        let data = req.body;
        let consumption = await Consumption.findOne({ product: data.product });
        if (consumption) return res.send({ message: 'Consumption already exists' });
        let updateConsumption = await Consumption.findOneAndUpdate({ _id: consumptionId }, data, { new: true });
        if (!updateConsumption) return res.send({ message: 'Consumption not found' });
        return res.status(201).send({ message: 'Consumption updated successfully' });
    } catch (err) {
        console.error();
        return res.status(500).send({ message: 'Error updating consumption' });
    }
}

exports.getConsumption = async (req, res) => {
    try {
        let consumption = await Consumption.find();
        return res.status(200).send({ consumption });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting consumptions' });
    }
}

exports.getById = async (req, res) => {
    try {
        let { id } = req.params;
        let consumption = await Consumption.findOne({ _id: id });
        if (!consumption) return res.send({ message: 'Consumption not found' });
        return res.status(200).send({ consumption });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting' });
    }
}

exports.delete = async (req, res) => {
    try {
        let { id } = req.params;
        let consumptionDelete = await Consumption.findByIdAndDelete({ _id: id });
        if (!consumptionDelete) return res.send({ message: 'Consumption not found and not deleted' });
        return res.status(200).send({ message: `Consumption ${consumptionDelete.name} deleted successfully` });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error deleting' })
    }
}