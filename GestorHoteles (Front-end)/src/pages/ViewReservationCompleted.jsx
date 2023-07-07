import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TableReservation } from '../components/Tables/TableReservation'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


export const ViewReservationCompleted = () => {

    const navigate = useNavigate()

    const [tableReservation, setTableReservation] = useState([{}])
    const [reservation, setReservation] = useState([{}])
    const [search, setSearch] = useState("")


    const getTableReservation = async () => {
        try {
            const { data } = await axios('http://localhost:3200/reservation/getCompleted')
            setTableReservation(data.reservation)
            setReservation(data.reservation)
        } catch (e) {
            console.log(e);
        }
    }

    const deleteReservation = async (id) => {
        try {
            Swal.fire({
                title: 'Do you want to delete this record?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const { data } = await axios.delete(`http://localhost:3200/reservation/deleteReservation/${id}`);
                    getTableReservation();
                    Swal.fire(
                        data.message,
                        '',
                        'success'
                    );
                }
            });
        } catch (e) {
            console.log(e);
        }
    }

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
        filtrar(e.target.value)
    }

    const filtrar = (searchTerm) => {
        var resultSearch = tableReservation.filter((elemento) => {
            if (elemento.user.name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
                return elemento
        })
        setReservation(resultSearch)
    }

    useEffect(() => getTableReservation, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light mb-4" style={{ background: "#9dc19d" }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>Reservation Completed</h1>
                    </div>
                </div>
            </nav>
            <div className="container">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-2 col-lg-8">
                        <input type="search" id="form1" className="form-control" value={search} onChange={handleChangeSearch} />
                        <label className="form-label" htmlFor="form1" />
                    </div>
                    <div className="col-md-6 col-lg-2">
                        <button type="button" className="btn btn-primary mx-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </button>
                        <button onClick={(() => navigate('/profile/reservation'))} className='btn btn-dark'>
                            In progress
                        </button>
                    </div>
                </div>
            </div >
            <section className="intro">
                <div className="bg-image h-100" style={{ backgroundColor: '#f5f7fa' }}>
                    <div className="mask d-flex align-items-center h-100">
                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="card-body p-0">
                                            <div className="table-responsive table-scroll" data-mdb-perfect-scrollbar="true" style={{ position: 'relative', height: '700px' }}>
                                                <table className="table table-striped ">
                                                    <thead style={{ backgroundColor: '#8c7c62' }}>
                                                        <tr>
                                                            <th scope="col">User</th>
                                                            <th scope="col">Hotel</th>
                                                            <th scope="col">Room</th>
                                                            <th scope="col">Event</th>
                                                            <th scope='col'>Date</th>
                                                            <th scope='col'>State</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            reservation.map(({ _id, user, hotel, room, event, date, State }, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <TableReservation
                                                                            user={user?.name}
                                                                            hotel={hotel?.name}
                                                                            room={room?.name}
                                                                            event={event?.name}
                                                                            date={date}
                                                                            State={State}
                                                                        ></TableReservation>
                                                                    </tr>

                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            <br />
        </>
    )
}
