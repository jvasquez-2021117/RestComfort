import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UpdateHotel = () => {
    const [tableHotel, setTableHotel] = useState([{}])
    const { id } = useParams();

    const getTableHotel = async () => {
        try {
            const { data } = await axios(`http://localhost:3200/hotel/getById/${id}`)
            setTableHotel(data.hotel)
        } catch (e) {
            console.log(e);
        }
    }

    const updateHotel = async () => {
        try {
            let updatedHotel = {
                name: document.getElementById('inputName').value,
                description: document.getElementById('inputDescription').value,
                address: document.getElementById('inputAddress').value,
                qualification: document.getElementById('inputQualification').value,
            }
            const { data } = await axios.put(`http://localhost:3200/hotel/updateHotel/${id}`, updatedHotel)
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

    useEffect(() => getTableHotel, []);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#1abc9c" }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>UPDATE HOTEL</h1>
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
                                            <input defaultValue={tableHotel.name} name='name' type="text" className="form-control form-control-lg" id='inputName' required />
                                        </div>
                                    </div>
                                    <div className="row align-items-center pt-4 pb-3">
                                        <div className="col pe-5">
                                            <label htmlFor='inputDescription' className="mb-0" >Description</label>
                                            <textarea defaultValue={tableHotel.description} className='form-control' name="description" id="inputDescription" required></textarea>
                                        </div>
                                        <div className="col pe-5">
                                            <label htmlFor='inputAddress' className="mb-0" >Address</label>
                                            <textarea defaultValue={tableHotel.address} className='form-control' name="address" id="inputAddress" required></textarea>
                                        </div>
                                    </div>
                                    <hr className="mx-n3" />
                                    <div className="mx-n3">
                                        <label htmlFor="inputQualification" className="form-label">Qualification</label>
                                        <select defaultValue={tableHotel.qualification} name='qualification' className="form-control" id="inputQualification">
                                            <option>1 estrella</option>
                                            <option>2 estrellas</option>
                                            <option>3 estrellas</option>
                                            <option>4 estrellas</option>
                                            <option>5 estrellas</option>
                                        </select>
                                    </div>
                                    <hr className="mx-n3" />
                                    <div className="px-5 py-4">
                                        <div className="row">
                                            <div className="col">
                                                <Link to={'/profile/viewHotels'}>
                                                    <button onClick={() => updateHotel()} type="submit" className="btn btn-primary btn-lg">Update</button>
                                                </Link>
                                            </div>
                                            <div className="col">
                                                <Link to={'/profile/viewHotels'}>
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
