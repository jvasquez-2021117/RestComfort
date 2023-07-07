import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { TableReservation } from '../components/Tables/TableReservation'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Bill2 } from '../components/Bill/Bill'

export const ViewBill = () => {

    const [tableReservation, setTableReservation] = useState([{}])
    const [reservation, setReservation] = useState([{}])
    const navigate = useNavigate();

    const getTableReservation = async () => {
        try {
            const { data } = await axios('http://localhost:3200/bill/getBill')
            setTableReservation(data.bill)
            setReservation(data.bill)
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => getTableReservation, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light " style={{ background: "#9dc19d" }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>Bill</h1>
                    </div>
                </div>
            </nav>
            <section className="intro t">
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
                                                            <th scope="col">Name</th>
                                                            <th scope="col">Surname</th>
                                                            <th scope="col">Nit</th>
                                                            <th scope="col">Hotel</th>
                                                            <th scope='col'>Room</th>
                                                            <th scope='col'>Room Price</th>
                                                            <th scope='col'>Services</th>
                                                            <th scope='col'>Consumption</th>
                                                            <th scope='col'>Total</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            reservation.map(({ _id, name, surname, nit, hotel, room, roomPrice, services, consumption, total }, index) => {
                                                                return (
                                                                    <tr key={index}>
                                                                        <Bill2
                                                                            name={name}
                                                                            surname={surname}
                                                                            nit={nit}
                                                                            hotel={hotel?.name}
                                                                            room={room?.name}
                                                                            roomPrice={roomPrice}
                                                                            services={services?.name}
                                                                            consumption={consumption?.name}
                                                                            total={total}
                                                                        ></Bill2>
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
