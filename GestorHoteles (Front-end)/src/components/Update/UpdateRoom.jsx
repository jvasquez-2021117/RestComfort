import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UpdateRoom = () => {
    const [tableRoom, setTableRoom] = useState([{}])
    const [typeRoom, setTypeRoom] = useState([{}])
    const [hotel, setHotel] = useState([{}])
    const { id } = useParams();


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
    const getTableRoom = async () => {
        try {
            const { data } = await axios(`http://localhost:3200/room/getById/${id}`);
            setTableRoom(data.room)
        } catch (e) {
            console.log(e);
        }
    }

    const updateRoom = async() => {
        try {
            let updatedRoom = {
                name: document.getElementById('inputName').value,
                noGuest: document.getElementById('inputGuest').value,
                price: document.getElementById('inputPrice').value,
                roomTypes: document.getElementById('inputRoomType').value,
                hotel: document.getElementById('inputHotel').value
            }
            const { data } = await axios.put(`http://localhost:3200/room/update/${id}`, updatedRoom)
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
        getTableRoom(),
            getHotel(),
            getTypeRoom()
    }, [])
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#1abc9c" }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>Update Rooms</h1>
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
                                            <label htmlFor='inputName' className="mb-0" >Name</label>
                                            <input defaultValue={tableRoom.name} name='name' type="text" className="form-control form-control-lg" id='inputName' required />
                                        </div>
                                    </div>
                                    <div className="row align-items-center pt-4 pb-3">
                                        <div className="col-md- pe-5">
                                            <label htmlFor='inputGuest' className="mb-0" >No Guest</label>
                                            <input defaultValue={tableRoom.noGuest} name='noGuest' type="text" className="form-control form-control-lg" id='inputGuest' required />
                                        </div>
                                        <div className="col-md- pe-5">
                                            <label htmlFor='inputPrice' className="mb-0" >Price</label>
                                            <input defaultValue={tableRoom.price} name='price' type="text" className="form-control form-control-lg" id='inputPrice' required />
                                        </div>
                                    </div>
                                    <div className="row align-items-center pt-4 pb-3">
                                        <div className="col pe-5">
                                            <label htmlFor="inputRoomType" className="form-label">TypeRoom</label>
                                            <select name="roomTypes" id="inputRoomType" className="form-control" required>
                                                {
                                                    typeRoom.map(({ _id, name }, i) => {
                                                        return (
                                                            <option key={i} value={_id} defaultValue={tableRoom.roomTypes}>{name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <hr className="mx-n3" />
                                    <div className="mx-n3">
                                        <label htmlFor="inputHotel" className="form-label">Hotel</label>
                                        <select name="hotel" id="inputHotel" className="form-control" required>
                                            {
                                                hotel.map(({ _id, name }, i) => {
                                                    return (
                                                        <option key={i} value={_id} defaultValue={tableRoom.hotel}>{name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <hr className="mx-n3" />
                                    <div className="px-5 py-4">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Link to={'/profile/viewRooms'}>
                                                    <button onClick={() => updateRoom()} type="submit" className="btn btn-primary btn-lg">Update</button>
                                                </Link>
                                            </div>
                                            <div className="col-md-6">
                                                <Link to={'/profile/viewRooms'}>
                                                    <button type="submit" className="btn btn-danger btn-lg">Cancel</button>
                                                </Link>
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
