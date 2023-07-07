import axios from 'axios'
import React from 'react'
import { Modal } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export const ModalTypeRoom = ({ isOpen, onClose }) => {

    const navigate = useNavigate();

    const addTypeRoom = async () => {
        try {
            let typeRoom = {
                name: document.getElementById('inputName').value
            }
            const { data } = await axios.post('http://localhost:3200/roomType/add', typeRoom)
            Swal.fire({
                icon: 'success',
                title: data.message
            })
            if (data.message == 'room type already exists') navigate('/profile/optionAdmin')
            if (data.message == 'room type create successfully') navigate('/profile/viewTypeRoom')
        } catch (e) {
            console.log(e);
        }
    }

    if (!isOpen) {
        return null;
    }
    return (
        <>
            <>
                <Modal show={isOpen}>
                    <Modal.Header>
                        <Modal.Title className="text-dark">ADD TypeRoom</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="inputName" className="form-label">Name</label>
                                <input type="text" className="form-control" id="inputName" aria-describedby="nameHelp" placeholder='Name' />
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => addTypeRoom()} type="submit" className="btn btn-primary">Add</button>
                        <button className='btn btn-danger' onClick={onClose}>cerrar</button>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    )
}
