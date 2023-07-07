import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const RegisterPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        surname: '',
        password: '',
        email: '',
    })

    const registerHandleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const register = async (e) => {
        try {
            const { data } = await axios.post('http://localhost:3200/user/register', form)
            Swal.fire({
                icon: 'success',
                title: data.message
            })
            if (data.message == 'Account created succesfully') {
                navigate('/login')
            }
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: err.response.data.message
            })
        }
    }

    return (
        <>
            <div className='container t'>
                <div className="card col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-5" style={{ margin: 'auto auto' }}>
                    <div className="card-body">
                        <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                            <li className="nav-item" role="presentation">
                                <a className="nav-link active" id="tab-register" data-mdb-toggle="pill" /* href="#pills-register" */ role="tab"
                                    aria-controls="pills-register" aria-selected="false">Register</a>
                            </li>
                        </ul>
                        <div className='tab-content'>
                            <div className="tab-pane fade show active" id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                                <form>
                                    <div className="text-center mb-3">
                                        <p>Sign up with:</p>
                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                            </svg>
                                        </button>
                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-center">or:</p>
                                    <div className="form-floating">
                                        <input type="text" id="registerName" className="form-control" onChange={registerHandleChange} name='name' placeholder='Name' />
                                        <label htmlFor="registerName">Name</label>
                                    </div>
                                    <br />
                                    <div className="form-floating">
                                        <input type="text" id="registerUsername" className="form-control" onChange={registerHandleChange} name='surname' placeholder='Surname' />
                                        <label className="form-label" htmlFor="registerUsername">Surname</label>
                                    </div>
                                    <br />
                                    <div className="form-floating">
                                        <input type="email" id="registerEmail" className="form-control" onChange={registerHandleChange} name='email' placeholder='Email' />
                                        <label className="form-label" htmlFor="registerEmail">Email</label>
                                    </div>
                                    <br />
                                    <div className="form-floating">
                                        <input type="password" id="registerPassword" className="form-control" onChange={registerHandleChange} name='password' placeholder='Password' />
                                        <label className="form-label" htmlFor="registerPassword">Password</label>
                                    </div>
                                    <hr />
                                    <div className="row justify-content-center">
                                        <div className="col-md-3">
                                            <button onClick={() => register()} type="button" className="btn btn-primary btn-block">SignUp</button>
                                        </div>
                                        <div className="col-md-2">
                                            <Link to={'/'}>
                                                <button type="button" className="btn btn-danger btn-block ">Cancel</button>
                                            </Link>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
