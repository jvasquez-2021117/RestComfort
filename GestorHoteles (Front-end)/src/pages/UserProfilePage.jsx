import React, { useContext } from 'react'
import '../components/CSS/style.css'
import '../App.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useState } from 'react'
import { AuthContext } from '../Index'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import queryString from 'query-string';

export const UserProfilePage = () => {

    const navigate = useNavigate();
    const { dataUser } = useContext(AuthContext);
    const { handleLogout } = useContext(AuthContext)
    const location = useLocation();
    const queryParams = queryString.parse(location.search);

    const logOut = () => {
        Swal.fire({
            title: 'Do you want to log out?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Closed session',
                    '',
                    'success',
                );
                localStorage.clear();
                handleLogout();
                navigate('/');
            }
        });
    }

    const deleteAccount = async () => {
        try {
            let id = dataUser.id
            Swal.fire({
                title: 'Are you sure you want to delete your account?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await axios.delete(`http://localhost:3200/user/delete/${id}`);
                    Swal.fire(
                        data.message,
                        '',
                        'success'
                    );
                    if (data.message == 'User deleting succesfully') {
                        navigate('/')
                    }
                }
            });
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div className="container t">
                <div className="row flex-lg-nowrap">
                    <div className="col-12 col-lg-auto mb-3 w1">
                        <Link to={'/profile'} className='nav-link'>
                            <h4>Settings</h4>
                        </Link>
                        {
                            dataUser.role == 'CLIENT' ? (
                                <Link to={'/profile/record'} className='nav-link'>
                                    <h4>Historial</h4>
                                </Link>
                            ) : <></>

                        }
                        <button className='btn btn-danger' onClick={() => logOut()}>Log Out</button>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col mb-5">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="e-profile">
                                            <div className="row">
                                                <div className="col d-flex flex-column flex-sm-row justify-content-between mb-3">
                                                    <div className="text-center text-sm-left mb-2 mb-sm-0">
                                                        <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">Account settings</h4>
                                                    </div>
                                                    {
                                                        dataUser.role == 'CLIENT' ? (
                                                            <div className="text-left">
                                                                <button onClick={() => deleteAccount()} className='btn btn-danger'>
                                                                    <span className="pt-sm-2 pb-1 mb-0 text-nowrap">Delete account</span>
                                                                </button>
                                                            </div>
                                                        ) : <></>
                                                    }

                                                </div>
                                                <div className="text-left">
                                                    <span className="fw-light">Info personal</span>
                                                </div>
                                            </div>
                                            <div className="tab-content pt-3">
                                                <div className="tab-pane active">
                                                    <form className="form" noValidate="">
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="col">
                                                                    <div className="form-group">
                                                                        <label>Name</label>
                                                                        <input className="form-control" type="text" id='nameInput' name="name" defaultValue={queryParams.name || dataUser.name} readOnly />
                                                                    </div>
                                                                </div>
                                                                <hr />
                                                                <div className="col">
                                                                    <div className="form-group">
                                                                        <label>Surname</label>
                                                                        <input className="form-control" type="text" id='surnameInput' name="username" defaultValue={queryParams.surname || dataUser.surname} readOnly />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <br />
                                                        {
                                                            dataUser.role == 'CLIENT' ? (
                                                                <div className="row">
                                                                    <div className="col d-flex justify-content-end">
                                                                        <button onClick={() => navigate(`/profile/updateUserAccount/${dataUser.id}`)} className="btn btn-primary" id='buttonActivate' type="button">Update personal information</button>
                                                                    </div>
                                                                </div>
                                                            ) : <></>
                                                        }
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
