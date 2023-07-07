import React, { useState } from 'react'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { OptionHotels } from '../components/Options/OptionHotels'
import { ModalReservation } from '../components/Modal/ModalReservation'
import { useContext } from 'react'
import { AuthContext } from '../Index'

export const HomePage = () => {

    const { dataUser, loggedIn } = useContext(AuthContext)
    const [showModalReservation, setShowModalReservation] = useState(false)
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [qualification, setQualification] = useState('');

    const handleSearch = (name, address, qualification) => {
        setName(name);
        setAddress(address);
        setQualification(qualification)
    };

    const handleOpenModal4 = () => {
        setShowModalReservation(true);
        console.log(showModalReservation);
    }
    const handleCloseModal4 = () => {
        setShowModalReservation(false);
    }
    return (
        <>
            <div className="container t">
                <div className="row flex-lg-nowrap">
                    <div className="col-12 col-lg-3 mb-3" >
                        <div className="card">
                            <Sidebar onSearch={handleSearch}></Sidebar>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col mb-3">
                                {
                                    dataUser.role == 'CLIENT' ? (
                                        <button onClick={handleOpenModal4} type="button" className="w-100 btn btn-lg btn-outline-success">Reservation</button>
                                    ) : <></>
                                }
                                <OptionHotels nameFilter={name} addressFilter={address} qualificationFilter={qualification} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <ModalReservation isOpen={showModalReservation} onClose={handleCloseModal4}></ModalReservation>
        </>
    )
}
