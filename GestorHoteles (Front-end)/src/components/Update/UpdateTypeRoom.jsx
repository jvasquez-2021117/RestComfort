import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export const UpdateTypeRoom = () => {
    const navigate = useNavigate();

    const [tableTypeRoom, setTableTypeRoom] = useState([{}]);
    const { id } = useParams();

    const getTableTypeRooms = async () => {
        try {
            const { data } = await axios(`http://localhost:3200/roomType/getById/${id}`)
            setTableTypeRoom(data.roomType);
            console.log(data.roomType);
        } catch (e) {
            console.log(e);
        }
    }

    const updateTypeRoom = async () => {
        try {
            let updatedTypeRoom = {
                name: document.getElementById('inputName').value
            }
            const { data } = await axios.put(`http://localhost:3200/roomType/update/${id}`, updatedTypeRoom)
            Swal.fire({
                icon: 'success',
                title: data.message
            })
            navigate('/profile/viewTypeRoom')
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data.message
            })
        }
    }

    useEffect(() => getTableTypeRooms, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#1abc9c" }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>Update Type Room</h1>
                    </div>
                </div>
            </nav>
            <section className="" /* style="background-color: #2779e2;" */>
                <div className="container t h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-9">
                            <div className="card" /* style="border-radius: 15px;" */>
                                <div className="card-body">
                                    <div className="row align-items-center pt-4 pb-3">
                                        <div className="col-md- pe-5">
                                            <h6 className="mb-0">Name</h6>
                                            <input name='name' defaultValue={tableTypeRoom.name} type="text" className="form-control form-control-lg" id='inputName' />
                                        </div>
                                    </div>
                                    <hr className="mx-n3" />
                                    <div className="px-5 py-4">
                                        <div className="row">
                                            <div className="col">
                                                <button onClick={() => updateTypeRoom()} type="submit" className="btn btn-primary btn-lg">Update</button>
                                            </div>
                                            <div className="col">
                                                <button onClick={() => navigate('/profile/viewTypeRoom')} type="submit" className="btn btn-danger btn-lg">Cancel</button>
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
