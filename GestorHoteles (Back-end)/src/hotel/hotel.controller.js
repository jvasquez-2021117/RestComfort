'use strict'

const Hotel = require('./hotel.model');
const path = require('path')

exports.test = (req, res) => {
    return res.send({ message: 'Test function running' });
}

exports.addHotel = async (req, res) => {
    try {
        let data = req.body;
        let hotelExist = await Hotel.findOne({ description: data.description });
        if (hotelExist) return res.send({ message: 'Hotel already exists' });
        let hotel = new Hotel(data);
        await hotel.save();
        return res.status(201).send({ message: 'Hotel added successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error adding Hotel' });
    }
}

exports.updateHotel = async (req, res) => {
    try {
        let hotelId = req.params.id;
        let data = req.body;
        let hotel = await Hotel.findOne({name: data.name});
        if(hotel) return res.send({message: 'Hotel already exists'});
        let updateHotel = await Hotel.findOneAndUpdate({ _id: hotelId }, data, { new: true });
        if (!updateHotel) return res.send({ message: 'Hotel not found' });
        return res.status(201).send({ message: 'Hotel updated successfully' });
    } catch (err) {
        console.error();
        return res.status(500).send({ message: 'Error updating Hotel' });
    }
}

exports.deleteHotel = async (req, res) => {
    try {
        let hotelId = req.params.id
        let data = req.body;
        let deleteHotel = await Hotel.findByIdAndDelete({ _id: hotelId });
        if (!deleteHotel) return res.send({ message: 'Hotel not found' });
        return res.status(201).send({ message: 'Hotel deleted successfully' });
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting Hotel' });
    }
}

exports.getHotel = async (req, res) => {
    try {
        let hotel = await Hotel.find();
        return res.status(200).send({ hotel });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting Hotel' });
    }
}

exports.getById = async (req, res) => {
    try {
        let { id } = req.params;
        let hotel = await Hotel.findOne({ _id: id });
        if (!hotel) return res.send({ message: 'hotel not found' });
        return res.status(200).send({ hotel });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting' });
    }
}

exports.updateImg = async (req, res) => {
    try {
        const idHotel = req.params.id;
        const alreadyImage = await Hotel.findOne({ _id: idHotel })
        let pathFile = './upload/hotel/'
        if (!req.files.image || !req.files.image.type) return res.status(400).send({ message: 'Havent sent image' })
        const filePath = req.files.image.path
        const fileSplit = filePath.split('\\')
        const fileName = fileSplit[2]
        const extension = path.extname(fileName).toLowerCase();
        const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
        if (!allowedExtensions.includes(extension)) {
            fs.unlinkSync(filePath)
            return res.status(400).send({ message: 'Invalid extension' })
        }
        if (alreadyImage.image && extension !== path.extname(alreadyImage.image).toLowerCase()) {
            fs.unlinkSync(`${pathFile}${alreadyImage.image}`)
        }
        const updatedHotel = await Hotel.findOneAndUpdate(
            { _id: idHotel },
            { image: fileName },
            { new: true }
        )
        if (!updatedHotel) return res.status(404).send({ message: 'Cellar not found, not updated' })
        return res.send({ message: 'Uploaded image', updatedHotel })
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error upload img' });
    }
}

exports.getHotelsData = async (req, res) => {
    try {
        let hotel = await Hotel.find();
        const filteredData = hotel.map(({ name, nOfReservations }) => ({ name, nOfReservations }));
        return res.status(200).send({ filteredData });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error getting Hotel' });
    }
};