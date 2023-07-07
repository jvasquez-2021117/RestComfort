import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const UpdateEvent = () => {

    const navigate = useNavigate()

    const [tableEvent, setTableEvent] = useState([{}])
    const { id } = useParams();

    const [typeEvent, setTypeEvent] = useState([{}])
    const [hotels, setHotels] = useState([{}])

    const getTypeRoom = async () => {
        try {
            const { data } = await axios('http://localhost:3200/eventType/get')
            setTypeEvent(data.eventTypes)
        } catch (e) {
            console.log(e);
        }
    }

    const getHoltes = async () => {
        try {
            const { data } = await axios('http://localhost:3200/hotel/getHotel')
            setHotels(data.hotel)
        } catch (e) {
            console.log(e);
        }
    }

    const getTableEvent = async () => {
        try {
            const { data } = await axios(`http://localhost:3200/events/getById/${id}`)
            setTableEvent(data.event)
        } catch (e) {
            console.log(e);
        }
    }


    const updateEvent = async () => {
        try {
            let updatedEvent = {
                name: document.getElementById('inputName').value,
                description: document.getElementById('inputDescription').value,
                eventType: document.getElementById('inputEventType').value,
                hotel: document.getElementById('inputHotel').value
            }
            const { data } = await axios.put(`http://localhost:3200/events/updateEvent/${id}`, updatedEvent)
            Swal.fire({
                icon: 'success',
                title: data.message
            })
            navigate('/profile/viewEvent')
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data.message
            })
        }
    }

    useEffect(() => {
        getTableEvent(),
            getTypeRoom(),
            getHoltes()
    }, [])


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#1abc9c" }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>Update Event</h1>
                    </div>
                </div>
            </nav>
            <section className="t" /* style="background-color: #2779e2;" */>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-9">
                            <div className="card" /* style="border-radius: 15px;" */>
                                <div className="card-body">
                                    <div className="row align-items-center pt-4 pb-3">
                                        <div className="col-md- pe-5">
                                            <h6 className="mb-0">Name</h6>
                                            <input name='name' defaultValue={tableEvent.name} type="text" className="form-control form-control-lg" id='inputName' />
                                        </div>
                                    </div>
                                    <div className="row align-items-center pt-4 pb-3">
                                        <div className="col pe-5">
                                            <h6 className="mb-0">Description</h6>
                                            <input defaultValue={tableEvent.description} name='surname' type="text" className="form-control form-control-lg" id='inputDescription' />
                                        </div>
                                        <div className="col pe-5">
                                            <h6 className="mb-0">Event Type</h6>
                                            <select className="form-control" id='inputEventType' >
                                                {
                                                    typeEvent.map(({ _id, name }, i) => {
                                                        return (
                                                            <option key={i} value={_id} defaultValue={tableEvent.eventType}>{name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="row align-items-center pt-4 pb-3">
                                        <div className="col-md- pe-5">
                                            <h6 className="mb-0">Hotel</h6>
                                            <select className="form-control" id='inputHotel' >
                                                {
                                                    hotels.map(({ _id, name }, i) => {
                                                        return (
                                                            <option key={i} value={_id} defaultValue={tableEvent.hotel}>{name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <hr className="mx-n3" />
                                    <div className="px-5 py-4">
                                        <div className="row">
                                            <div className="col">
                                                <button onClick={() => updateEvent()} type="submit" className="btn btn-primary btn-lg">Update</button>
                                            </div>
                                            <div className="col">
                                                <button onClick={() => navigate('/profile/viewEvent')} type="submit" className="btn btn-danger btn-lg">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
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
