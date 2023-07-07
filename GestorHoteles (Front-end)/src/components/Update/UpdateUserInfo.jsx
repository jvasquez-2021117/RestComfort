import axios from 'axios';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../Index';

export const UpdateUserInfo = () => {

    const navigate = useNavigate();
    const [tableUserInfo, setTableUserInfo] = useState([{}])
    const { id } = useParams();

    const getAccount = async () => {
        try {
            const { data } = await axios(`http://localhost:3200/user/getById/${id}`)
            setTableUserInfo(data.accountUser)
        } catch (e) {
            console.log(e);
        }
    }

    const updateAccountUser = async () => {
        try {
            let updatedAccountUser = {
                name: document.getElementById('inputName').value,
                surname: document.getElementById('inputSurname').value
            }
            const { data } = await axios.put(`http://localhost:3200/user/update/${id}`, updatedAccountUser)
            Swal.fire({
                icon: 'success',
                title: data.message
            })
            navigate(`/profile?name=${updatedAccountUser.name}&surname=${updatedAccountUser.surname}`)
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data.message
            })
        }
    }

    useEffect(() => getAccount, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#1abc9c" }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>Update Account</h1>
                    </div>
                </div>
            </nav>
            <br />
            <section className="vh-100">
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-9">
                            <div className="card" /* style="border-radius: 15px;" */>
                                <div className="card-body">
                                    <div className="row align-items-center pt-4 pb-3">
                                        <div className="col-md- pe-5">
                                            <label htmlFor='inputName' className="mb-0" >Name</label>
                                            <input defaultValue={tableUserInfo.name} name='name' type="text" className="form-control form-control-lg" id='inputName' />
                                        </div>
                                    </div>
                                    <div className="row align-items-center pt-4 pb-3">
                                        <div className="col pe-5">
                                            <label htmlFor='inputSurname' className="mb-0" >Surname</label>
                                            <input defaultValue={tableUserInfo.surname} name="surname" type="text" className='form-control' id="inputSurname" />
                                        </div>
                                    </div>
                                    <hr className='mx-n3' />
                                    <div className="px-5 py-4">
                                        <div className="row">
                                            <div className="col">
                                                <button onClick={() => updateAccountUser()} type="submit" className="btn btn-primary btn-lg">Update</button>
                                            </div>
                                            <div className="col">
                                                <button onClick={() => navigate('/profile')} type="submit" className="btn btn-danger btn-lg">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}
