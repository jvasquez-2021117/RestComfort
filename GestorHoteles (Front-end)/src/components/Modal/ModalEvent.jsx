import axios from 'axios'
import React from 'react'
import { Modal } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'

import { useNavigate } from 'react-router-dom';

export const ModalEvent = ({ isOpen, onClose }) => {

    const navigate = useNavigate()
    const [event, setEvent] = useState([{}])
    const [hotel, setHotel] = useState([{}])

    const getEventType = async () => {
        try {
            const { data } = await axios('http://localhost:3200/eventType/get')
            setEvent(data.eventTypes)
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

    const addEvent = async () => {
        try {
            let Event = {
                name: document.getElementById('inputName').value,
                description: document.getElementById('inputDescription').value,
                eventType: document.getElementById('inputEventType').value,
                hotel: document.getElementById('inputHotel').value
            }
            const { data } = await axios.post('http://localhost:3200/events/addEvents', Event)
            Swal.fire({
                icon: 'success',
                title: data.message
            })
            if (data.message == 'Event already exists') navigate('/profile/optionAdmin')
            if (data.message == 'Event added successfully') navigate('/profile/viewEvent')
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => getEventType, [])
    useEffect(() => getHotel, [])

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <>
                <Modal show={isOpen}>
                    <Modal.Header>
                        <Modal.Title className="text-dark">ADD Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="inputName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="inputName" aria-describedby="nameHelp" placeholder='Name' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputDescription" className="form-label">Description</label>
                                <input type="text" className="form-control" id="inputDescription" aria-describedby="nameHelp" placeholder='Name' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputEventType" className="form-label">EventType</label>
                                <select name="" id="inputEventType" className="form-control" required>
                                    {
                                        event.map(({ _id, name }, i) => {
                                            return (
                                                <option key={i} value={_id}>{name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputHotel" className="form-label">Hotel</label>
                                <select name="" id="inputHotel" className="form-control" required>
                                    {
                                        hotel.map(({ _id, name }, i) => {
                                            return (
                                                <option key={i} value={_id}>{name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => addEvent()} type="submit" className="btn btn-primary">Add</button>
                        <button className='btn btn-danger' onClick={onClose}>cerrar</button>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    )
}
