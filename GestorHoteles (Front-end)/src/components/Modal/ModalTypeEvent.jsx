import axios from 'axios'
import React from 'react'
import { Modal } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export const ModalTypeEvent = ({ isOpen, onClose }) => {

    const navigate = useNavigate()

    const addTypeEvent = async () => {
        try {
            let typeEvent = {
                name: document.getElementById('inputName').value
            }
            const { data } = await axios.post('http://localhost:3200/eventType/add', typeEvent)
            Swal.fire({
                icon: 'success',
                title: data.message
            })
            if (data.message == 'Type event already exists') navigate('/profile/optionAdmin')
            if (data.message == 'Type event adding succesfully') navigate('/profile/viewEventType')
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
                        <Modal.Title className="text-dark">ADD TypeEvent</Modal.Title>
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
                        <button onClick={() => addTypeEvent()} type="submit" className="btn btn-primary">Add</button>
                        <button className='btn btn-danger' onClick={onClose}>cerrar</button>
                    </Modal.Footer>
                </Modal>
            </>
        </>
    )
}
