import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export const ModalRoom = ({ isOpen, onClose }) => {

    const navigate = useNavigate()

    const [typeRoom, setTypeRoom] = useState([{}])
    const [hotel, setHotel] = useState([{}])

    const getTypeRoom = async () => {
        try {
            const { data } = await axios('http://localhost:3200/roomType/get')
            setTypeRoom(data.roomTypes);
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

    const addRoom = async () => {
        try {
            let room = {
                name: document.getElementById('inputName').value,
                noGuest: document.getElementById('inputGuest').value,
                price: document.getElementById('inputPrice').value,
                roomType: document.getElementById('inputRoomType').value,
                hotel: document.getElementById('inputHotel').value
            }
            const { data } = await axios.post('http://localhost:3200/room/add', room)
            Swal.fire({
                icon: 'success',
                title: data.message
            })
            if (data.message == 'Room already exists') navigate('/profile/optionAdmin')
            if (data.message == 'Room created successfully') navigate('/profile/viewRooms')
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => getTypeRoom, [])
    useEffect(() => getHotel, [])

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <>
                <Modal show={isOpen}>
                    <Modal.Header>
                        <Modal.Title className="text-dark">ADD Room</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="inputName" className="form-label">Name</label>
                                <input type="text" className="form-control" id='inputName' aria-describedby='nameHelp' placeholder='Name' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputGuest" className="form-label">No. Guest</label>
                                <input type="number" className="form-control" id='inputGuest' aria-describedby='nameHelp' placeholder='Name' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputPrice" className="form-label">Price</label>
                                <input type="number" className="form-control" id='inputPrice' aria-describedby='nameHelp' placeholder='Name' />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputRoomType" className="form-label">TypeRoom</label>
                                <select name="" id="inputRoomType" className="form-control" required>
                                    {
                                        typeRoom.map(({ _id, name }, i) => {
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
                            <div className="mb-3">
                                <div className="col-md- pe-5">
                                    <h6 className="mb-0">Photo</h6>
                                    <input className="form-control " id="formFileLg" type="file" />
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => addRoom()} type="submit" className="btn btn-primary">Add</button>
                        <button className='btn btn-danger' onClick={onClose}>cerrar</button>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    )
}
