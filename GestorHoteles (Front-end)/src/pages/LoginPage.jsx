import axios from 'axios'
import React, { useState, useContext } from 'react'
import { AuthContext } from '../Index'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const LoginPage = () => {

    const navigate = useNavigate();

    const { setLoggedIn, setDataUser } = useContext(AuthContext);
    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const login = async (e) => {
        try {
            e.preventDefault()
            const { data } = await axios.post('http://localhost:3200/user/login', form)
            if (data.token) {
                setLoggedIn(true)
                localStorage.setItem('token', data.token)
                setDataUser({
                    id: data.userLogged.id,
                    name: data.userLogged.name,
                    surname: data.userLogged.surname,
                    role: data.userLogged.role
                })
                Swal.fire({
                    icon: 'success',
                    title: data.message,
                })
                navigate('/home')
            }
            if (data.message == 'Check that all fields are complete') {
                Swal.fire({
                    icon: 'error',
                    title: data.message,
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="container t">
                <div className="card col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-5" style={{ padding: '20px', margin: 'auto auto', marginBottom: '30px' }}>
                    <div className="card-body">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                                <form>
                                    <div className="text-center mb-3">
                                        <p >Sign in with:</p>
                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                            </svg>
                                        </button>
                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <p className="text-center">or:</p>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="loginName">Email or username</label>
                                        <input onChange={handleChange} id="loginName" name="email" className='form-control' type="text" />
                                    </div>
                                    <div className="form-outline mb-4">
                                        <label className="form-label" htmlFor="loginPassword">Password</label>
                                        <input onChange={handleChange} id="loginPassword" name="password" className='form-control' type="password" />
                                    </div>
                                    <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
                                        <li className="nav-item" role="presentation">
                                            <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="#pills-login" role="tab"
                                                aria-controls="pills-login" aria-selected="true">Login</a>
                                        </li>
                                    </ul>
                                    <div className="row mb-4">
                                        <div className="col-md-6 d-flex justify-content-center">
                                            <a href="#!" >Forgot password?</a>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="a text-center'">
                                        <div className='a2'>
                                            <button onClick={(e) => login(e)} className="btn btn-primary btn-block mb-4">Sign in</button>
                                            <button onClick={() => navigate('/')} type="submit" className="btn btn-danger btn-block mb-4 ">Cancel</button>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <p>Not a member? <a href="#!" onClick={() => navigate('/register')}>Register</a></p>
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