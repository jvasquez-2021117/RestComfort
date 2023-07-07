import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TableReservation } from '../components/Tables/TableReservation'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export const ViewReservation = () => {

    const [tableReservation, setTableReservation] = useState([{}])
    const [reservation, setReservation] = useState([{}])
    const [search, setSearch] = useState("")
    const navigate = useNavigate();

    const getTableReservation = async () => {
        try {
            const { data } = await axios('http://localhost:3200/reservation/getInprogress')
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
            <br />
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#9dc19d" }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>VIEW RESERVATION</h1>
                    </div>
                </div>
            </nav>
            <div className="container t">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-2 col-lg-6">
                        <div className="row">
                            <div className="col">
                                <input type="search" id="form1" className="form-control" value={search} onChange={handleChangeSearch} />
                                <label className="form-label" htmlFor="form1" />
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-primary mx-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-lg-2">
                        <div className="row">
                            <div className="col">
                                <button className='btn btn-dark' onClick={() => navigate('/profile/reservationCompleted')} >
                                    Completed
                                </button>
                            </div>
                            <div className="col">
                                <button onClick={(() => navigate('/profile/optionAdmin'))} className='btn btn-danger'>
                                    Exit
                                </button>
                            </div>
                        </div>
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
                                                            <th scope='col'>Actions</th>
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
                                                                        <td className="text-center align-middle">
                                                                            <div className="btn-group align-top">
                                                                                <Link to={'/profile/reservation'} onClick={() => deleteReservation(_id)} className="btn btn-sm btn-danger btn-outline-secondary badge" type="button">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                                                    </svg>
                                                                                </Link>
                                                                                <Link to={`/profile/addBill/${_id}`}>
                                                                                    <button className="btn btn-dark" type="button" data-toggle="modal" data-target="#user-form-modal">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-receipt" viewBox="0 0 16 16">
                                                                                            <path d="M1.92.506a.5.5 0 0 1 .434.14L3 1.293l.646-.647a.5.5 0 0 1 .708 0L5 1.293l.646-.647a.5.5 0 0 1 .708 0L7 1.293l.646-.647a.5.5 0 0 1 .708 0L9 1.293l.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .801.13l.5 1A.5.5 0 0 1 15 2v12a.5.5 0 0 1-.053.224l-.5 1a.5.5 0 0 1-.8.13L13 14.707l-.646.647a.5.5 0 0 1-.708 0L11 14.707l-.646.647a.5.5 0 0 1-.708 0L9 14.707l-.646.647a.5.5 0 0 1-.708 0L7 14.707l-.646.647a.5.5 0 0 1-.708 0L5 14.707l-.646.647a.5.5 0 0 1-.708 0L3 14.707l-.646.647a.5.5 0 0 1-.801-.13l-.5-1A.5.5 0 0 1 1 14V2a.5.5 0 0 1 .053-.224l.5-1a.5.5 0 0 1 .367-.27zm.217 1.338L2 2.118v11.764l.137.274.51-.51a.5.5 0 0 1 .707 0l.646.647.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.646.646.646-.646a.5.5 0 0 1 .708 0l.509.509.137-.274V2.118l-.137-.274-.51.51a.5.5 0 0 1-.707 0L12 1.707l-.646.647a.5.5 0 0 1-.708 0L10 1.707l-.646.647a.5.5 0 0 1-.708 0L8 1.707l-.646.647a.5.5 0 0 1-.708 0L6 1.707l-.646.647a.5.5 0 0 1-.708 0L4 1.707l-.646.647a.5.5 0 0 1-.708 0l-.509-.51z" />
                                                                                            <path d="M3 4.5a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 1 1 0 1h-6a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm8-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 0 1h-1a.5.5 0 0 1-.5-.5z" />
                                                                                        </svg>
                                                                                        Facturar
                                                                                    </button>
                                                                                </Link>
                                                                            </div>
                                                                        </td>
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
