import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GetEvent } from '../Event/GetEvent';

export const DropEvent = ({id}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [event, setEvent] = useState([{}]);    


    const getEvent = async () => {
        try {
            const { data } = await axios(`http://localhost:3200/events/searchEventByHotel/${id}`)
            setEvent(data.events)
            setIsOpen(!isOpen);
            console.log(data.events);
        } catch (e) {
            console.log(e);
        }
    }

    return (        
            <div>
                <button onClick={getEvent} className='btn btn-success'>Events</button>
                {isOpen && (
                    <div className="contenedor">
                        <br />
                        <ul className='list-group list-group-horizontal lista-horizontal'>
                            {
                                event.map(({ _id, name, description, eventType}, index) => {
                                    return (
                                        <div key={index}>
                                            <GetEvent
                                                name={name}
                                                description={description}
                                                eventType={eventType?.name}
                                            ></GetEvent>
                                        </div>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )}
            </div>
    )
}
