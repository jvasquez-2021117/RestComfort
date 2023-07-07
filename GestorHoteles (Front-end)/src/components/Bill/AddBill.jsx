import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const AddBill = () => {

    const navigate = useNavigate()
    const [services, setServices] = useState([{}])
    const [consumption, setConsumption] = useState([{}])
    const [reservation, setReservation] = useState({})
    const [disabledButtons, setDisabledButtons] = useState([]);
    const [disabledButtons2, setDisabledButtons2] = useState([]);
    const [arrayServices, setArrayServices] = useState([]);

    const [arrayConsumption, setArrayConsumption] = useState([]);

    const { id } = useParams();


    const getReservation = async () => {
        try {
            console.log(id);
            const { data } = await axios.get(`http://localhost:3200/reservation/getById/${id}`);
            setReservation(data.reservation)
        } catch (e) {
            console.log(e);
        }
    }

    const getServices = async () => {
        try {
            const { data } = await axios('http://localhost:3200/services/getService');
            setServices(data.service)
        } catch (e) {
            console.log(e);
        }
    }

    const getConsumption = async () => {
        try {
            const { data } = await axios('http://localhost:3200/consumption/getConsumption');
            setConsumption(data.consumption)
        } catch (e) {
            console.log(e);
        }
    }

    const addArrayServices = (id, index) => {
        setArrayServices([
            ...arrayServices,
            id
        ]);
        setDisabledButtons([...disabledButtons, index]);
        console.log(arrayServices);
    }

    const addArrayConsumption = (id, index) => {
        setArrayConsumption([
            ...arrayConsumption,
            id
        ]);
        setDisabledButtons2([...disabledButtons2, index]);
        console.log(arrayConsumption);
    }

    const deleteArrayService = (id, index) => {
        let posicion = arrayServices.indexOf(id);
        if (posicion !== -1) {
            const newArray = [...arrayServices];
            newArray.splice(posicion, 1);
            setArrayServices(newArray);
        }
        setDisabledButtons(disabledButtons.filter((i) => i !== index));
        console.log(arrayServices);
    }

    const deleteArrayConsumption = (id, index) => {
        let posicion = arrayConsumption.indexOf(id);
        if (posicion !== -1) {
            const newArray = [...arrayConsumption];
            newArray.splice(posicion, 1);
            setArrayConsumption(newArray);
        }
        setDisabledButtons2(disabledButtons2.filter((i) => i !== index));
        console.log(arrayConsumption);
    }

    const addBill = async () => {
        try {
            let bill = {
                user: reservation.user._id,
                nit: document.getElementById('inputNit').value,
                hotel: reservation.hotel._id,
                room: reservation.room._id,
                services: arrayServices,
                consumption: arrayConsumption
            }
            console.log(reservation.hotel._id);
            const { data } = await axios.post('http://localhost:3200/bill/addBill', bill)
            await axios.put(`http://localhost:3200/reservation/updateState/${id}`);
            Swal.fire({
                icon: 'success',
                title: data.message
            })
            if (data.message == 'Bill added successfully') navigate('/profile/reservation')
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => getReservation, [])
    useEffect(() => getServices, [])
    useEffect(() => getConsumption, [])


    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#1abc9c" }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>Bill</h1>
                    </div>
                </div>
            </nav>
            <section className="vh-auto mb-5 t" /* style="background-color: #2779e2;" */>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-9">
                            <div className="card" /* style="border-radius: 15px;" */>
                                <div className="card-body">
                                    <div className="row align-items-center pt-4 pb-3">
                                        <div className="col-md- pe-5">
                                            <label htmlFor='inputUser' className="mb-0" >Name</label>
                                            <input defaultValue={reservation.user?.name} disabled name='name' type="text" className="form-control form-control-lg" id='inputUser' required />
                                        </div>
                                        <div className="col-md- pe-5">
                                            <label htmlFor='inputNit' className="mb-0" >NIT</label>
                                            <input name='noGuest' type="text" className="form-control form-control-lg" id='inputNit' required />
                                        </div>
                                        <div className="col-md- pe-5">
                                            <label htmlFor='inputHotel' className="mb-0" >Hotel</label>
                                            <input defaultValue={reservation.hotel?.name} disabled name='price' type="text" className="form-control form-control-lg" id='inputHotel' required />
                                        </div>
                                        <div className="col-md- pe-5">
                                            <label htmlFor='inputRoom' className="mb-0" >Room</label>
                                            <input defaultValue={reservation.room?.name} disabled name='price' type="text" className="form-control form-control-lg" id='inputRoom' required />
                                        </div>
                                    </div>
                                    <div className="table-responsive table-lg mt-3">
                                        <div className="card-header py-3">
                                            <h4 className="my-0 fw-normal">Services</h4>
                                        </div>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style={{ color: "black" }}>Name</th>
                                                    <th style={{ color: "black" }}>Price</th>
                                                    <th style={{ color: "black" }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    services.map(({ _id, name, price, color }, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{name}</td>
                                                                <td>{price}</td>
                                                                <td className="text-center align-middle">
                                                                    <div className="btn-group align-top">
                                                                        <button onClick={() => addArrayServices(_id, index)} disabled={disabledButtons.includes(index)} className={`btn btn-primary`}>Agregar</button>
                                                                        <button onClick={() => deleteArrayService(_id, index)} className='btn btn-danger'>Cancelar</button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="table-responsive table-lg mt-3">
                                        <div className="card-header py-3">
                                            <h4 className="my-0 fw-normal">Consumption</h4>
                                        </div>
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th style={{ color: "black" }}>Name</th>
                                                    <th style={{ color: "black" }}>Price</th>
                                                    <th style={{ color: "black" }}>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    consumption.map(({ _id, product, price, color }, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{product}</td>
                                                                <td>{price}</td>
                                                                <td className="text-center align-middle">
                                                                    <div className="btn-group align-top">
                                                                        <button onClick={() => addArrayConsumption(_id, index)} disabled={disabledButtons2.includes(index)} className={`btn btn-primary`}>Agregar</button>
                                                                        <button onClick={() => deleteArrayConsumption(_id, index)} className='btn btn-danger'>Cancelar</button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="px-5 py-4">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <Link >
                                                    <button onClick={() => addBill()} type="submit" className="btn btn-primary btn-lg">Create bill</button>
                                                </Link>
                                            </div>
                                            <div className="col-md-6">
                                                <button onClick={() => navigate('/profile/reservation')} type="submit" className="btn btn-danger btn-lg">Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
