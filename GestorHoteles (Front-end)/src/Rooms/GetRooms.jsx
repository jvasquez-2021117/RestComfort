import React from 'react'
import room from '../assets/room.jpg'

export const GetRooms = ({name, noGuest, price, roomType, availability }) => {
    return (
        <>
            <li className='list-group' style={{margin: '5%'}}>
                <div className="card">
                    <img src={room} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Q{price}</h6>
                        <p className="card-text">noGuest: {noGuest}</p>
                        <p className="card-text">roomType: {roomType}</p>
                        <blockquote className="blockquote mb-0">                            
                            <footer className="blockquote-footer">{availability}</footer>
                        </blockquote>
                    </div>
                </div>
            </li>
        </>
    )
}
