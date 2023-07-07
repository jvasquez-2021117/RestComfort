import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const UpdateAdminHotel = () => {

    const navigate = useNavigate()
    const [tableAdminHotel, setTableAdminHotel] = useState([{}])
    const [hotel, setHotel] = useState([{}])
    const { id } = useParams();

    const getHotel = async () => {
        try {
            const { data } = await axios('http://localhost:3200/hotel/getHotel')
            setHotel(data.hotel)
        } catch (e) {
            console.log(e);
        }
    }

    const getTableAdminHotel = async () => {
        try {
            const { data } = await axios(`http://localhost:3200/userHotel/getById/${id}`)
            setTableAdminHotel(data.userHotel)
        } catch (e) {
            console.log(e);
        }
    }

    const updateAdminHotel = async () => {
        try {
            let updatedAdminHotel = {
                name: document.getElementById('inputName').value,
                surname: document.getElementById('inputSurname').value,
                email: document.getElementById('inputEmail').value,
                hotel: document.getElementById('inputHotel').value
            }
            const { data } = await axios.put(`http://localhost:3200/userHotel/update/${id}`, updatedAdminHotel)
            Swal.fire({
                icon: 'success',
                title: data.message
            })
            navigate('/profile/viewAdminHotel')
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data.message
            })
        }
    }

    useEffect(() => {
        getTableAdminHotel(),
            getHotel()
    }, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#1abc9c" }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>Update ADMIN HOTEL</h1>
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
                                            <input defaultValue={tableAdminHotel.name} name='name' type="text" className="form-control" id='inputName' />
                                        </div>
                                        <div className="col-md- pe-5">
                                            <label htmlFor="inputSurname" className="form-label">Surname</label>
                                            <input defaultValue={tableAdminHotel.surname} type="text" name='surname' className="form-control" id='inputSurname' placeholder='Surame' />
                                        </div>
                                        <div className="col-md- pe-5">
                                            <label htmlFor="inputEmail" className="form-label">Email</label>
                                            <input defaultValue={tableAdminHotel.email} type="email" name="email" id="inputEmail" className='form-control' placeholder='name@gmail.com' />
                                        </div>
                                    </div>
                                    <div className="mx-n3">
                                        <label htmlFor="inputHotel" className="form-label">Hotel</label>
                                        <select name="hotel" id="inputHotel" className="form-control" required>
                                            {
                                                hotel.map(({ _id, name }, i) => {
                                                    return (
                                                        <option key={i} value={_id} defaultValue={tableAdminHotel.hotel}>{name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <hr className="mx-n3" />
                                    <div className="px-5 py-4">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <button onClick={() => updateAdminHotel()} type="submit" className="btn btn-primary btn-lg">Update</button>
                                            </div>
                                            <div className="col-md-6">
                                                <button onClick={() => navigate('/profile/viewAdminHotel')} type="submit" className="btn btn-danger btn-lg">Cancel</button>
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
