import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TableRooms } from '../components/Tables/TableRooms'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

export const ViewRooms = () => {
    const navigate = useNavigate();
    const [tableRoom, setTableRoom] = useState([{}])
    const [room, setRoom] = useState([{}])
    const [search, setSearch] = useState("")
    const [search2, setSearch2] = useState("")
    const [selectedOption, setSelectedOption] = useState("");

    const getTableRoom = async () => {
        try {
            const { data } = await axios('http://localhost:3200/room/get')
            setTableRoom(data.rooms)
            setRoom(data.rooms)
        } catch (e) {
            console.log(e);
        }
    }

    const deleteRoom = async (id) => {
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
                    const { data } = await axios.delete(`http://localhost:3200/room/delete/${id}`)
                    getTableRoom();
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

    const handleChangeSearch2 = (e) => {
        filtrar2(e.target.value)
        setSelectedOption(e.target.value)
    }

    const filtrar = (searchTerm) => {
        var resultSearch = tableRoom.filter((elemento) => {
            if (elemento.name.toString().toLowerCase().includes(searchTerm.toLowerCase()))
                return elemento
        })
        setRoom(resultSearch)
    }

    const roomsAvailable = async () => {
        try {
            const { data } = await axios('http://localhost:3200/room/countRoomsAvailability');
            Swal.fire({
                icon: 'success',
                title: 'Rooms available',
                text: data.count
            })
        } catch (e) {
            console.log(e);
        }
    }

    const filtrar2 = (searchTerm) => {
        if (searchTerm === "Disponible") {
            const resultSearch = tableRoom.filter((elemento) => {
                return elemento.availability === "Disponible";
            });
            setRoom(resultSearch);
        } else if (searchTerm === "No disponible") {
            const resultSearch = tableRoom.filter((elemento) => {
                return elemento.availability === "No disponible";
            });
            setRoom(resultSearch);
        } else {
            setRoom(tableRoom);
        }
    };
    useEffect(() => getTableRoom, [])

    return (
        <>
            <br />
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#9dc19d" }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>VIEW ROOMS</h1>
                    </div>
                </div>
            </nav>
            <br />
            <div className="container">
                <div className="row d-flex justify-content-center ">
                    <div className="col-md-2 col-lg-4">
                        <div className="row">
                            <div className="col">
                                <select className="form-select" aria-label="Default select example" id="inputAvailability" value={selectedOption} onChange={handleChangeSearch2} >
                                    <option>Availability</option>
                                    <option>Disponible</option>
                                    <option>No disponible</option>
                                </select>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-link" onClick={() => roomsAvailable()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard-check-fill" viewBox="0 0 16 16">
                                        <path d="M6.5 0A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3Zm3 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3Z" />
                                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1A2.5 2.5 0 0 1 9.5 5h-3A2.5 2.5 0 0 1 4 2.5v-1Zm6.854 7.354-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708Z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-lg-6">
                        <div className="row">
                            <div className="col">
                                <input type="search" id="form1" className="form-control" value={search} onChange={handleChangeSearch} />
                                <label className="form-label" htmlFor="form1" />
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-link" style={{ marginRight: '1rem' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <button onClick={(() => navigate('/profile/optionAdmin'))} className='btn btn-danger'>Exist</button>
                    </div>
                    <div>
                    </div>
                </div>
            </div >
            <section className="intro">
                <div className="bg-image h-100" style={{ backgroundColor: '#f5f7fa' }}> {/* background: #f5f7fa; */}
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
                                                            <th scope="col">Name</th>
                                                            <th scope="col">NoGuest</th>
                                                            <th scope="col">Price</th>
                                                            <th scope="col">Room Type</th>
                                                            <th scope="col">Availability</th>
                                                            <th scope="col">Hotel</th>
                                                            <th scope='col'>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            room.map(({ _id, name, noGuest, price, roomType, availability, hotel }, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <TableRooms
                                                                            name={name}
                                                                            noGuest={noGuest}
                                                                            price={price}
                                                                            roomType={roomType?.name}
                                                                            availability={availability}
                                                                            hotel={hotel?.name}
                                                                        ></TableRooms>
                                                                        <td className="text-center align-middle">
                                                                            <div className="btn-group align-top">
                                                                                <Link to={`/profile/updateRoom/${_id}`} className="btn btn-sm btn-primary btn-outline-secondary badge">
                                                                                    <button className="btn badge" type="button" data-toggle="modal" data-target="#user-form-modal">
                                                                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                                                        </svg>
                                                                                    </button>
                                                                                </Link>
                                                                                <button onClick={() => deleteRoom(_id)} className="btn btn-sm btn-danger btn-outline-secondary badge" type="button">
                                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                                                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                                                                    </svg>
                                                                                </button>
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
            </section>
            <br />
        </>
    )
}
