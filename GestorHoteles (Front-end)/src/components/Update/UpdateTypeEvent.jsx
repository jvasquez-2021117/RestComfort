import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

export const UpdateTypeEvent = () => {

    const navigate = useNavigate()

    const [tableTyeEvent, setTableTyeEvent] = useState([{}]);
    const { id } = useParams();

    const getTableTypeEvent = async () => {
        try {
            const { data } = await axios(`http://localhost:3200/eventType/getByid/${id}`)
            setTableTyeEvent(data.eventType);
        } catch (e) {
            console.log(e);
        }
    }

    const updateEventType = async () => {
        try {
            let updatedEventType = {
                name: document.getElementById('inputName').value
            }
            const { data } = await axios.put(`http://localhost:3200/eventType/update/${id}`, updatedEventType)
            Swal.fire({
                icon: 'success',
                title: data.message
            })
            navigate('/profile/viewEventType')
        } catch (e) {
            Swal.fire({
                icon: 'error',
                title: e.response.data.message
            })
        }
    }

    useEffect(() => getTableTypeEvent, [])

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ background: "#1abc9c" }}>
                <div className="container-fluid">
                    <div className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample" >
                        <h1 className='text-white' style={{ fontSize: "2.5rem" }}>Update Type Event</h1>
                    </div>
                </div>
            </nav>
            <section className="t" /* style="background-color: #2779e2;" */>
                <div className="container h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-xl-9">
                            <div className="card" /* style="border-radius: 15px;" */>
                                <div className="card-body">
                                    <div className="row align-items-center pt-4 pb-3">
                                        <div className="col-md- pe-5">
                                            <h6 className="mb-0">Description</h6>
                                            <input name='name' defaultValue={tableTyeEvent.name} type="text" className="form-control form-control-lg" id='inputName' />
                                        </div>
                                    </div>
                                    <hr className="mx-n3" />
                                    <div className="px-5 py-4">
                                        <div className="row">
                                            <div className="col">
                                                <button onClick={() => updateEventType()} type="submit" className="btn btn-primary btn-lg">Update</button>
                                            </div>
                                            <div className="col">
                                                <button onClick={() => navigate('/profile/viewEventType')} type="submit" className="btn btn-danger btn-lg">Cancel</button>
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
