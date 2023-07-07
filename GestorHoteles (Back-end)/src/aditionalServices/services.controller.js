'use strict'

const Services = require('./services.model');

exports.test = (req, res)=>{
    return res.send({message: 'test fuction is running'});
}

exports.addServices = async(req, res)=>{
    try{
        let data = req.body;
        let serviceExist = await Services.findOne({name: data.name});
        if(serviceExist) return res.send({message: 'Additional service already exists'});
        let service = new Services(data);
        await service.save();
        return res.status(201).send({message: 'Additional service added successfully'});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error adding additional service'});
    }
}

exports.updateService = async(req, res)=>{
    try{
        let serviceId = req.params.id;
        let data = req.body;
        let service = await Services.findOne({name: data.name});
        if(service) return res.send({message: 'Service already exists'});
        let updateService = await Services.findOneAndUpdate({_id: serviceId}, data, {new: true});
        if(!updateService) return res.send({message: 'Additional service not found'});
        return res.status(201).send({message: 'Additional service updated successfully'});
    }catch(err){
        console.error();
        return res.status(500).send({message: 'Error updating additional service'});
    }
}

exports.getService = async(req, res)=>{
    try{
        let service = await Services.find();
        return res.status(200).send({service});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting additional services'});
    }
}

exports.getById = async(req, res)=>{
    try{
        let { id } = req.params;
        let service = await Services.findOne({_id: id});
        if(!service) return res.send({message: 'Service not found'});
        return res.status(200).send({service});
    }catch(err){
        console.error(err);
        return res.status(500).send({message: 'Error getting'});
    }
}

exports.delete = async(req, res)=>{
    try{
        let { id } = req.params;
        let serviceDelete = await Services.findByIdAndDelete({_id: id});
        if(!serviceDelete) return res.send({message: 'Service not found and not deleted'});
        return res.status(200).send({message: `Service ${serviceDelete.name} deleted successfully`});
    }catch(e){
        console.error(e);
        return res.status(500).send({message: 'Error deleting'})
    }
}