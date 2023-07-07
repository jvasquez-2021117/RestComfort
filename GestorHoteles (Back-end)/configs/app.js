'use strict'    

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3200;

const eventTypeRoutes = require('../src/eventType/eventType.routes');
const roomTypeRoutes = require('../src/roomType/roomType.routes');
const servicesRoutes = require('../src/aditionalServices/services.routes');
const eventRoutes = require('../src/event/event.routes');
const roomRoutes = require('../src/room/room.routes');
const consumptionRoutes = require('../src/consumption/consumption.routes');
const hotelRoutes = require('../src/hotel/hotel.routes');
const reservationRoutes = require('../src/reservation/reservation.routes');
const billRoutes = require('../src/bill/bill.routes');
const userRoutes = require('../src/user/user.routes');
const userHotelRoutes = require('../src/userHotel/userHotel.routes');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

app.use('/eventType', eventTypeRoutes)
app.use('/roomType', roomTypeRoutes);
app.use('/services', servicesRoutes);
app.use('/events', eventRoutes);
app.use('/room', roomRoutes);
app.use('/consumption', consumptionRoutes);
app.use('/hotel', hotelRoutes);
app.use('/reservation', reservationRoutes);
app.use('/bill', billRoutes);
app.use('/user', userRoutes);
app.use('/userHotel', userHotelRoutes)

exports.initServer = () => {
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}