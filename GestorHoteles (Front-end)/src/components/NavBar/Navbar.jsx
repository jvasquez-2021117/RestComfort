import React, { useContext, useState } from 'react'
import logo from '../../assets/logoHeader.png'
import '../CSS/style.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Index'

export const Navbar = () => {

    const { dataUser, loggedIn } = useContext(AuthContext)

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-white sticky-top navbar-light p-3 shadow-sm">
                <div className="container">
                    <Link to={'/'} id='a' className="navbar-brand d-block d-lg-none">
                        <img src={logo} height="30px" />
                    </Link>
                    <li className="nav-item d-none d-lg-block">
                        <Link to={'/'} className="nav-link mx-2">
                            <img className="img-hover" src={logo} height="50px" />
                        </Link>
                    </li>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className=" collapse navbar-collapse" id="navbarNavDropdown">
                        <div className="input-group rounded" style={{ width: '15vw', marginLeft: '4vw' }}>
                            <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                            <span className="input-group-text border-0" id="search-addon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </span>
                        </div>
                        <ul className="navbar-nav ms-auto ">
                            <li className="nav-item">
                                <Link to={'/home'} id='aXD' className="nav-link mx-2 text-uppercase">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to={'/profile'} id='aXD' className="nav-link mx-2 text-uppercase">
                                    Account
                                </Link>
                            </li>
                            {
                                loggedIn == true && dataUser.role == 'ADMIN-APP' ? (
                                    <>
                                        <li className="nav-item">
                                            <Link to={'/profile/graph'} id='aXD' className="nav-link mx-2 text-uppercase">
                                                Statistics
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={'/profile/optionAdmin'} id='aXD' className="nav-link mx-2 text-uppercase">
                                                Option
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to={'/profile/users'} id='aXD' className="nav-link mx-2 text-uppercase">
                                                Users
                                            </Link>
                                        </li>
                                    </>
                                ) : loggedIn == true && dataUser.role == 'ADMIN-HOTEL' ? (
                                    <li className="nav-item">
                                        <Link to={'/profile/optionAdmin'} id='aXD' className="nav-link mx-2 text-uppercase">
                                            Option
                                        </Link>
                                    </li>
                                ) :
                                    <></>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
