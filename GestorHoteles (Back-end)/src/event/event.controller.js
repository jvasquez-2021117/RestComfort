'use strict'

const Events = require('./event.model');

exports.test = (req, res) => {
    return res.send({ message: 'test fuction is running' });
}

exports.addEvents = async (req, res) => {
    try {
        let data = req.body;
        let eventExist = await Events.findOne({ name: data.name });
        if (eventExist) return res.send({ message: 'Event already exists' });
        let event = new Events(data);
        await event.save();
        return res.status(201).send({ message: 'Event added successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding event' });
    }
}

exports.updateEvent = async (req, res) => {
    try {
        let eventId = req.params.id;
        let data = req.body;
        let event = await Events.findOne({name: data.name});
        if(event) return res.send({message: 'Event already exists'});
        let updateEvent = await Events.findOneAndUpdate({ _id: eventId }, data, { new: true });
        if (!updateEvent) return res.send({ message: 'Event not found' });
        return res.status(201).send({ message: 'Event updated successfully' });
    } catch (err) {
        console.error();
        return res.status(500).send({ message: 'Error updating event' });
    }
}

exports.getEvent = async (req, res) => {
    try {
        let event = await Events.find().populate('eventType').populate('hotel');
        return res.status(200).send({ event });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting events' });
    }
}

exports.getById = async (req, res) => {
    try {
        let { id } = req.params;
        let event = await Events.findOne({ _id: id });
        if (!event) return res.send({ message: 'Event not found' });
        return res.status(200).send({ event });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting' });
    }
}

exports.searchEvents = async (req, res) => {
    try {
        let data = req.body;
        let events = await Events.findOne({ $and: [{ _id: data.hotel }, { event: data.event }] });
        return res.status(200).send({ events });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error to search' })
    }
}

exports.searchEventByHotel = async (req, res) => {
    try {
        let { id } = req.params;
        let events = await Events.find({ hotel: id }).populate('eventType');
        return res.status(200).send({ events });
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error to search 222' })
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        let idEvent = req.params.id
        let deletedEvent = await Events.findOneAndDelete({ _id: idEvent })
        if (!deletedEvent) return res.status(404).send({ message: 'Event not found and not deleted' })
        return res.send({ message: 'Event deleted sucessfully' })
    } catch (e) {
        console.error(e);
        return res.status(500).send({ message: 'Error to search 222' })
    }
}