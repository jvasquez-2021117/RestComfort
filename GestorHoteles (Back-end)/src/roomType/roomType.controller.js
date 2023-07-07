'use strict'

'use strict'

const { findOne } = require('./roomType.model');
const RoomType = require('./roomType.model');

exports.test = (req, res)=>{
    return res.send({message: 'test fuction is running'})
}

exports.add = async(req, res)=>{
    try{
        let data = req.body;
        let roomTypeExist = await RoomType.findOne({name: data.name});
        if(roomTypeExist) return res.send({message: 'room type already exists'});
        let newRoomType = new RoomType(data);
        await newRoomType.save();
        return res.status(200).send({message: 'room type create successfully'});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error adding'})
    }
}

exports.update = async(req, res)=>{
    try{
        let { id } = req.params;
        let data = req.body;
        let roomType = await RoomType.findOne({name: data.name});
        if(roomType) return res.send({message: 'roomType already exists'})
        let roomTypeExists = await RoomType.findOneAndUpdate({_id: id}, data, {new: true});
        if(!roomTypeExists) return res.send({message: 'Room type not found and not updated'});
        return res.status(200).send({message: 'Room type updated succesfully'});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error updating'})
    }
}

exports.delete = async(req, res)=>{
    try{
        let { id } = req.params;
        let roomTypeDelete = await RoomType.findOneAndDelete({_id: id});
        if(!roomTypeDelete) return res.send({message: 'Room type not found and not deleted'})
        return res.status(200).send({message: `Room type with name ${roomTypeDelete.name}, deleted successfully` });
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error deleting'});
    }
}

exports.get = async(req, res)=>{
    try{
        let roomTypes = await RoomType.find();
        return res.status(200).send({roomTypes});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'});
    }
}

exports.getById = async(req, res)=>{
    try{
        let { id } = req.params;
        let roomType = await RoomType.findOne({_id: id});
        return res.status(200).send({roomType});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error getting'});
    }
}