import React from 'react'
import { useState } from 'react'

export const Sidebar = ({ onSearch }) => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [qualification, setQualification] = useState('');

    const handleChangeName = (e) => {
        const value = e.target.value
        setName(value);
        onSearch(value, address, qualification);
    }

    const handleChangeAdress = (e) => {
        const value = e.target.value
        setAddress(value);
        onSearch(name, value, qualification);
    }

    const handleChangeQualification = (e) => {
        const value = e.target.value
        setQualification(value);
        onSearch(name, address, value);
    }

    /*     const handleSubmit = (e) => {
            e.preventDefault();
            onSearch(name);
        }; */

    const clearSelect = async () => {
        try {
            document.getElementById("inputQualification").value = ''
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <>
            <div className='card-body'>
                <form /* onSubmit={handleSubmit}*/ >
                    <div className="row">
                        <div className="">
                            <label htmlFor="inputDestination">Name</label>
                            <input /* value={name} onChange={(e) => setName(e.target.value)} */ onChange={handleChangeName} type="text" className="form-control" id="inputDestination" placeholder="Introduce el nombre" />
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="">
                            <label htmlFor="inputDestination">Ubicación</label>
                            <input type="text" className="form-control" id="inputDestination" onChange={handleChangeAdress} placeholder="Introduce la ubicación" />
                        </div>
                    </div>
                    <hr />
                    <div className="">
                        <div className="">
                            <label htmlFor="inputGuests">Calificacion</label>
                            <select className="form-control" id="inputQualification" onChange={handleChangeQualification}>
                                <option>1 estrella</option>
                                <option>2 estrellas</option>
                                <option>3 estrellas</option>
                                <option>4 estrellas</option>
                                <option>5 estrellas</option>
                            </select>
                        </div>
                    </div>
                    <hr />
                    <div className="row mt-3">
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary" onClick={() => clearSelect}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
