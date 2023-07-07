import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export const UpdateReservation = () => {
    const [tableReservation, setTableReservation] = useState([{}])
    const { id } = useParams();

    const [room, setRoom] = useState([{}])
    const [hotel, setHotel] = useState([{}])
    const [event, setEvent] = useState([{}])

    const getRoom = async () => {
        try {
            const { data } = await axios('http://localhost:3200/room/get')
            setRoom(data.rooms)
        } catch (e) {
            console.log(e);
        }
    }
    const getHotel = async () => {
        try {
            const { data } = await axios('http://localhost:3200/hotel/getHotel')
            setHotel(data.hotel)
        } catch (e) {
            console.log(e);
        }
    }
    const getEvent = async () => {
        try {
            const { data } = await axios('http://localhost:3200/events/getEvent')
            setEvent(data.event)
        } catch (e) {
            console.log(e);
        }
    }

    const getTableReservation = async () => {
        try {
            const { data } = await axios(`http://localhost:3200/reservation/getById/${id}`)
            setTableReservation(data.reservation)
        } catch (e) {
            console.log(e);
        }
    }

    const updateReservation = async () => {
        try {
            let updatedReservation = {
                hotel: document.getElementById('inputHotel').value,
                room: document.getElementById('inputRoom').value,
                event: document.getElementById('inputEvent').value,
            }
            const { data } = await axios.put(`http://localhost:3200/reservation/updateReservation/${id}`, updatedReservation)
            Swal.fire({
                icon: 'success',
                title: data.message
            })
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data.message
            })
        }
    }

    useEffect(() => {
        getRoom(),
            getHotel(),
            getEvent(),
            getTableReservation()
    }, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#1abc9c" }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>Update Reservation</h1>
                    </div>
                </div>
            </nav>
            <section className='t'>
                <div className="container h-100">
                    <div className='row d-flex justify-content-center h-100'>
                        <div className='col-xl-9'>
                            <div className='card'>
                                <div className='card-body'>
                                    <form action="#">
                                        <div className="row">
                                            <div className=" col form-group">
                                                <label htmlFor="inputHotel" className="form-label">Hotel</label>
                                                <select name='hotel' id="inputHotel" className="form-control" required>
                                                    {
                                                        hotel.map(({ _id, name }, i) => {
                                                            return (
                                                                <option key={i} value={_id} defaultValue={tableReservation.hotel}>{name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col form-group">
                                                <label htmlFor="inputRoom" className="form-label">Room</label>
                                                <select name="room" id="inputRoom" className="form-control" required>
                                                    {
                                                        room.map(({ _id, name }, i) => {
                                                            return (
                                                                <option key={i} value={_id} defaultValue={tableReservation.room}>{name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col form-group">
                                                <label htmlFor="inputEvent" className="form-label">Event</label>
                                                <select name="event" id="inputEvent" className="form-control" required>
                                                    {
                                                        event.map(({ _id, name }, i) => {
                                                            return (
                                                                <option key={i} value={_id} defaultValue={tableReservation.event}>{name}</option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </div>
                                            <div className="col form-group">
                                                <label htmlFor="inputDate">Date</label>
                                                <input type="date" className="form-control" id="inputDate" defaultValue={tableReservation.date} />
                                            </div>
                                        </div>
                                        <br />
                                        <center>
                                            <Link to={'/profile/reservation'}>
                                                <button onClick={() => updateReservation()} type="submit" className="btn btn-success btn-lg">Lease</button>
                                            </Link>
                                            <Link to={'/profile/reservation'}>
                                                <button type="submit" className="btn btn-danger btn-lg">Cancel</button>
                                            </Link>
                                        </center>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <br />
        </>
    )
}
