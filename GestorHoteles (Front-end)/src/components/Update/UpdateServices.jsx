import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const UpdateServices = () => {
    const navigate = useNavigate()
    const [tableServices, setTableServices] = useState([{}])
    const { id } = useParams();

    const getTableServices = async () => {
        try {
            const { data } = await axios(`http://localhost:3200/services/getById/${id}`);
            setTableServices(data.service)
        } catch (e) {
            console.log(e);
        }
    }

    const updateService = async () => {
        try {
            let updatedServices = {
                name: document.getElementById('inputName').value,
                price: document.getElementById('inputPrice').value,
            }
            const { data } = await axios.put(`http://localhost:3200/services/updateService/${id}`, updatedServices);
            Swal.fire({
                icon: 'success',
                title: data.message
            })
            navigate('/profile/viewServices')
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data.message
            })
        }
    }

    useEffect(() => getTableServices, [])
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#1abc9c" }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>Update Services</h1>
                    </div>
                </div>
            </nav>
            <section className="t" /* style="background-color: #2779e2;" */>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center  h-100">
                        <div className="col-xl-9">
                            <div className="card" /* style="border-radius: 15px;" */>
                                <div className="card-body">
                                    <div className="row align-items-center pt-4 pb-3">
                                        <div className="col-md- pe-5">
                                            <label htmlFor='inputName' className="mb-0" >Name</label>
                                            <input defaultValue={tableServices.name} name='name' type="text" className="form-control" id='inputName' required />
                                        </div>
                                        <div className="col pe-5">
                                            <label htmlFor='inputPrice' className="mb-0" >Price</label>
                                            <input defaultValue={tableServices.price} type="number" name="price" id="inputPrice" className='form-control' />
                                        </div>
                                    </div>
                                    <hr className="mx-n3" />
                                    <div className="px-5 py-4">
                                        <div className="row">
                                            <div className="col">
                                                <Link to={'/profile/viewServices'}>
                                                    <button onClick={() => updateService()} type="submit" className="btn btn-primary btn-lg">Update</button>
                                                </Link>
                                            </div>
                                            <div className="col">
                                                <Link to={'/profile/viewServices'}>
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
