'use strict'

const Room = require('./room.model');
const Hotel = require('../hotel/hotel.model');

exports.test = (req, res)=>{
    return  res.send({message: 'Test fuction is running'});
}

exports.add = async(req, res)=>{
    try{
        let data = req.body;
        data.availability = 'Disponible';
        let roomExists = await Room.findOne({$and: [{name: data.name}, {hotel: data.hotel}]});
        if(roomExists) return res.send({message: 'Room already exists'});
        let hotel = await Hotel.findOne({_id: data.hotel});
        if(!hotel) return res.send({message: 'Hotel not found'}); 
        let newRoom = new Room(data);
        await newRoom.save();
        return res.status(200).send({message: 'Room created successfully'});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error adding'});
    }
}

exports.update = async(req, res)=>{
    try{
        let { id } = req.params;
        let data = req.body;
        let room = await Room.findOne({name: data.name});
        if(room) return res.send({message: 'Room already exists'})
        let roomUpdate = await Room.findOneAndUpdate({_id: id}, data, {new:  true});
        if(!roomUpdate) return res.send({message: 'Room not found'});
        return res.status(200).send({message: 'Room updated'});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error updating'})
    }
}

exports.delete = async(req, res)=>{
    try{
        let { id } = req.params;
        let deleteRoom = await Room.findOneAndDelete({_id: id});
        if(!deleteRoom) return res.send({message: 'Room not found and not deleted'});
        return res.status(200).send({message: `Room with name ${deleteRoom.name}, deleted successfully`});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error deleting'});
    }
}

exports.get = async(req, res)=>{
    try{
        let rooms = await Room.find().populate('roomType').populate('hotel');
        return res.status(200).send({rooms});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'});
    }
}

exports.getById = async(req, res)=>{
    try{
        let { id } = req.params;
        let room = await Room.findOne({_id: id});
        return res.status(200).send({room});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'});
    }
}

exports.getByAvailability = async(req, res)=>{
    try{
        let rooms = await Room.find({availability: 'Disponible'});
        return res.status(200).send({rooms});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'});
    }
}

exports.countRoomsAvailability = async(req, res)=>{
    try{
        let rooms = await Room.find({availability: 'Disponible'});
        let count = rooms.length;
        return res.status(200).send({count});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error count'});
    }
}

exports.searchRoomByHotel = async(req, res) =>{
    try {
        let { id } = req.params;
        let rooms = await Room.find({hotel: id}).populate('roomType');
        return res.status(200).send({rooms});
    } catch (e) {
        console.log(e);
    }
}
