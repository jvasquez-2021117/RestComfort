import React, { useState } from 'react'
import { ModalTypeRoom } from '../components/Modal/ModalTypeRoom';
import { Link } from 'react-router-dom';
import { ModalRoom } from '../components/Modal/ModalRoom';
import { ModalHotel } from '../components/Modal/ModalHotel';
import room from '../assets/room.jpg';
import typeRoom from '../assets/typeRoom.jpg';
import hotel from '../assets/hotel.jpg';
import typeEvent from '../assets/typeEvent.jpg'
import event from '../assets/eventAdmin.jpg'
import { useNavigate } from 'react-router-dom';
import { ModalTypeEvent } from '../components/Modal/ModalTypeEvent';
import { ModalEvent } from '../components/Modal/ModalEvent';
import reservation from '../assets/reservations.jpg';
import { ModalAdminHotel } from '../components/Modal/ModalAdminHotel';
import adminHotel from '../assets/adminHotel.jpg'
import { ModalConsumption } from '../components/Modal/ModalConsumption';
import consumption from '../assets/consumption.jpg'
import services from '../assets/services.jpg'
import { ModalServices } from '../components/Modal/ModalServices';
import { AuthContext } from '../Index';
import { useContext } from 'react';
import bill from '../assets/bill.jpg'

export const AddHotelPage = () => {

    const navigate = useNavigate()

    const [showModalTypeRoom, setShowModalTypeRoom] = useState(false);
    const [showModalRoom, setShowModalRoom] = useState(false);
    const [showModalHotel, setShowModalHotel] = useState(false);
    const [showModalTypeEvent, setShowModalTypeEvent] = useState(false);
    const [showModalEvent, setShowModalEvent] = useState(false);
    const [showModalAdminHotel, setShowModalAdminHotel] = useState(false);
    const [showModalConsumption, setShowModalConsumption] = useState(false);
    const [showModalServices, setShowModalServices] = useState(false)

    const { dataUser } = useContext(AuthContext)

    const handleOpenModal = () => {
        setShowModalTypeRoom(true);
        console.log(showModalTypeRoom);
    };
    const handleCloseModal = () => {
        setShowModalTypeRoom(false);
    }

    const handleOpenModal2 = () => {
        setShowModalRoom(true);
        console.log(showModalRoom);
    };
    const handleCloseModal2 = () => {
        setShowModalRoom(false);
    }

    const handleOpenModal3 = () => {
        setShowModalHotel(true);
        console.log(showModalHotel);
    };
    const handleCloseModal3 = () => {
        setShowModalHotel(false);
    };

    const handleOpenModal4 = () => {
        setShowModalTypeEvent(true);
    };
    const handleCloseModal4 = () => {
        setShowModalTypeEvent(false);
    };

    const handleOpenModal5 = () => {
        setShowModalEvent(true);
    };
    const handleCloseModal5 = () => {
        setShowModalEvent(false);
    };

    const handleOpenModal6 = () => {
        setShowModalAdminHotel(true);
    };
    const handleCloseModal6 = () => {
        setShowModalAdminHotel(false);
    };

    const handleOpenModal7 = () => {
        setShowModalConsumption(true);
    };
    const handleCloseModal7 = () => {
        setShowModalConsumption(false);
    };

    const handleOpenModal8 = () => {
        setShowModalServices(true);
    };
    const handleCloseModal8 = () => {
        setShowModalServices(false);
    };


    return (
        <>
            <div className="container py-3">
                <header>
                    <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                        <h1 className="display-4 fw-normal">Options Admin</h1>
                        <p className="fs-5 text-muted">Unique option of the Administrator. Where you can enter the crud of the storage you can edit, delete and add</p>
                    </div>
                </header>
                <main>
                    {
                        dataUser.role != 'ADMIN-HOTEL' ? (
                            <>
                                <div className="row row-cols-1 row-cols-md-2 mb-2 text-center">
                                    <div className="col">
                                        <div className="card mb-4 rounded-3 shadow-sm">
                                            <div className="card-header py-3">
                                                <h4 className="my-0 fw-normal">Type Room</h4>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-unstyled mt-3 mb-4">
                                                    <img src={typeRoom} alt="Cellars Image" className='card-img' style={{ width: "95%", height: "95%" }} />
                                                </ul>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <button type="button" className="w-100 btn btn-lg btn-outline-primary" onClick={handleOpenModal}>Add</button>
                                                    </div>
                                                    <div className='col'>
                                                        <button onClick={() => navigate('/profile/viewTypeRoom')} type='button' className='w-100 btn btn-lg btn-outline-success'>View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-4 rounded-3 shadow-sm">
                                            <div className="card-header py-3">
                                                <h4 className="my-0 fw-normal">Rooms</h4>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-unstyled mt-3 mb-4">
                                                    <img src={room} alt="Accounts Image" className="card-img" style={{ width: "95%", height: "95%" }} />
                                                </ul>
                                                <div className="row">
                                                    <div className="col">
                                                        <button type="button" className="w-100 btn btn-lg btn-outline-primary" onClick={handleOpenModal2}>Add</button>
                                                    </div>
                                                    <div className="col">
                                                        <button onClick={() => navigate('/profile/viewRooms')} type="button" className="w-100 btn btn-lg btn-outline-success" >View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-4 rounded-3 shadow-sm">
                                            <div className="card-header py-3">
                                                <h4 className="my-0 fw-normal">Event</h4>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-unstyled mt-3 mb-4">
                                                    <img src={event} alt="Cellars Image" className='card-img' style={{ width: "95%", height: "95%" }} />
                                                </ul>
                                                <div className="row">
                                                    <div className="col">
                                                        <button type="button" className="w-100 btn btn-lg btn-outline-primary" onClick={handleOpenModal5}>Add</button>
                                                    </div>
                                                    <div className="col">
                                                        <button onClick={() => navigate('/profile/viewEvent')} type='button' className='w-100 btn btn-lg btn-outline-success'>View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="card mb-4 rounded-3 shadow-sm">
                                            <div className="card-header py-3">
                                                <h4 className="my-0 fw-normal">Hotel</h4>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-unstyled mt-3 mb-4">
                                                    <img src={hotel} alt="Clients Image" className="card-img" style={{ width: "95%", height: "95%" }} />
                                                </ul>
                                                <div className="row">
                                                    <div className="col">
                                                        <button type="button" className="w-100 btn btn-lg btn-outline-primary" onClick={handleOpenModal3}>Add</button>
                                                    </div>
                                                    <div className="col">
                                                        <button onClick={() => navigate('/profile/viewHotels')} type="button" className="w-100 btn btn-lg btn-outline-success" >View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-4 rounded-3 shadow-sm">
                                            <div className="card-header py-3">
                                                <h4 className="my-0 fw-normal">Type Event</h4>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-unstyled mt-3 mb-4">
                                                    <img src={typeEvent} alt="Cellars Image" className='card-img' style={{ width: "95%", height: "95%" }} />
                                                </ul>
                                                <div className="row">
                                                    <div className="col">
                                                        <button type="button" className="w-100 btn btn-lg btn-outline-primary" onClick={handleOpenModal4}>Add</button>
                                                    </div>
                                                    <div className="col">
                                                        <button onClick={() => navigate('/profile/viewEventType')} type='button' className='w-100 btn btn-lg btn-outline-success'>View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-4 rounded-3 shadow-sm">
                                            <div className="card-header py-3">
                                                <h4 className="my-0 fw-normal">Admin Hotel</h4>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-unstyled mt-3 mb-4">
                                                    <img alt="Accounts Image" src={adminHotel} className="card-img" style={{ width: "95%", height: "95%" }} />
                                                </ul>
                                                <div className="row">
                                                    <div className="col">
                                                        <button type="button" className="w-100 btn btn-lg btn-outline-primary" onClick={handleOpenModal6}>Add</button>
                                                    </div>
                                                    <div className="col">
                                                        <button type="button" onClick={() => navigate('/profile/viewAdminHotel')} className="w-100 btn btn-lg btn-outline-success" >View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) :
                            <>
                                <div className="row row-cols-1 row-cols-md-2 mb-2 text-center">
                                    <div className="col">
                                        <div className="card mb-4 rounded-3 shadow-sm">
                                            <div className="card-header py-3">
                                                <h4 className="my-0 fw-normal">Reservation</h4>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-unstyled mt-3 mb-4">
                                                    <img src={reservation} alt="Clients Image" className="card-img" style={{ width: "95%", height: "95%" }} />
                                                </ul>
                                                <div className="row">
                                                    <div className="col">
                                                        <button onClick={() => navigate('/profile/reservation')} type='button' className='w-100 btn btn-lg btn-outline-success'>View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-4 rounded-3 shadow-sm">
                                            <div className="card-header py-3">
                                                <h4 className="my-0 fw-normal">Services</h4>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-unstyled mt-3 mb-4">
                                                    <img alt="Accounts Image" src={services} className="card-img" style={{ width: "95%", height: "95%" }} />
                                                </ul>
                                                <div className="row">
                                                    <div className="col">
                                                        <button type="button" className="w-100 btn btn-lg btn-outline-primary" onClick={handleOpenModal8}>Add</button>
                                                    </div>
                                                    <div className="col">
                                                        <button type="button" onClick={() => navigate('/profile/viewServices')} className="w-100 btn btn-lg btn-outline-success" >View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="card mb-4 rounded-3 shadow-sm">
                                            <div className="card-header py-3">
                                                <h4 className="my-0 fw-normal">Consumption</h4>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-unstyled mt-3 mb-4">
                                                    <img src={consumption} alt="Clients Image" className="card-img" style={{ width: "95%", height: "95%" }} />
                                                </ul>
                                                <div className="row">
                                                    <div className="col">
                                                        <button type="button" className="w-100 btn btn-lg btn-outline-primary" onClick={handleOpenModal7}>Add</button>
                                                    </div>
                                                    <div className="col">
                                                        <button onClick={() => navigate('/profile/viewConsumption')} type='button' className='w-100 btn btn-lg btn-outline-success'>View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card mb-4 rounded-3 shadow-sm">
                                            <div className="card-header py-3">
                                                <h4 className="my-0 fw-normal">Bill</h4>
                                            </div>
                                            <div className="card-body">
                                                <ul className="list-unstyled mt-3 mb-4">
                                                    <img src={bill} alt="Clients Image" className="card-img" style={{ width: "95%", height: "95%" }} />
                                                </ul>
                                                <div className="row">
                                                    <div className="col">
                                                        <button onClick={() => navigate('/profile/viewBill')} type='button' className='w-100 btn btn-lg btn-outline-success'>View</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                    }
                </main>
            </div>

            <ModalTypeRoom isOpen={showModalTypeRoom} onClose={handleCloseModal}></ModalTypeRoom>
            <ModalRoom isOpen={showModalRoom} onClose={handleCloseModal2}></ModalRoom>
            <ModalHotel isOpen={showModalHotel} onClose={handleCloseModal3}></ModalHotel>
            <ModalTypeEvent isOpen={showModalTypeEvent} onClose={handleCloseModal4}></ModalTypeEvent>
            <ModalEvent isOpen={showModalEvent} onClose={handleCloseModal5}></ModalEvent>
            <ModalAdminHotel isOpen={showModalAdminHotel} onClose={handleCloseModal6}></ModalAdminHotel>
            <ModalConsumption isOpen={showModalConsumption} onClose={handleCloseModal7}></ModalConsumption>
            <ModalServices isOpen={showModalServices} onClose={handleCloseModal8} ></ModalServices>
        </>
    )
}
