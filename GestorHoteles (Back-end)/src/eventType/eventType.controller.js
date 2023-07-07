'use strict'

const EventType = require('./eventType.model');

exports.test = (req, res) => {
    return res.send({ message: 'Test Event type running' });
}

exports.addEventType = async (req, res) => {
    try {
        let data = req.body;
        let existsEventType = await EventType.findOne({ name: data.name });
        if (existsEventType) return res.send({ message: 'Type event already exists' });
        let eventType = new EventType(data);
        await eventType.save();
        return res.send({ message: 'Type event adding succesfully' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error adding type event' });
    }
}

exports.updateEventType = async (req, res) => {
    try {
        let idEventType = req.params.id;
        let data = req.body;
        let existsEventType = await EventType.findOne({ name: data.name });
        if (existsEventType) return res.send({ message: 'Type event already exists' });
        let updatedEventType = await EventType.findOneAndUpdate(
            { _id: idEventType },
            data,
            { new: true }
        )
        if (!updatedEventType) return res.status(400).send({ message: 'Event type not found and not update' });
        return res.send({ message: 'Event type updated succesfully' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error updating type event' });
    }
}

exports.deleteEventType = async (req, res) => {
    try {
        let idEventType = req.params.id;
        let deletedEventType = await EventType.findOneAndDelete({ _id: idEventType });
        if (!deletedEventType) return res.status(404).send({ message: 'Event type not found and not deleted' });
        return res.send({ message: 'Event type deleted sucessfully' })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error deleting type event' });
    }
}

exports.getEventsTypes = async (req, res) => {
    try {
        let eventTypes = await EventType.find();
        return res.status(200).send({ eventTypes })
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error view types events' });
    }
}

exports.getEventTypeById = async (req, res) => {
    try {
        let { id } = req.params;
        let eventType = await EventType.findOne({ _id: id });
        return res.status(200).send({ eventType });
    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Error get Type Event by id' });
    }
}
