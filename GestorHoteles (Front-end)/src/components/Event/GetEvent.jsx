import React from 'react'
import event from '../../assets/eventAdmin.jpg'

export const GetEvent = ({name, description, eventType}) => {
    return (
        <>
        <li className='list-group' style={{margin: '5%'}}>
                <div className="card">
                    <img src={event} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>                        
                        <p className="card-text">{description}</p>
                        <blockquote className="blockquote mb-0">                            
                            <footer className="blockquote-footer">{eventType}</footer>
                        </blockquote>
                    </div>
                </div>
            </li>
        </>
    )
}
