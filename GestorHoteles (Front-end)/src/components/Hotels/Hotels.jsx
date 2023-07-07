import React from 'react'
import { DropRoom } from '../Dropdown/DropRoom'
import { DropEvent } from '../Dropdown/DropEvent'

export const Hotels = ({_id, name, description, address, qualification }) => {
    return (
        <>
            <div className="card mb-3">
                <div className="card-body ">
                    <div className="row g-10">
                        <div className="col-md-4">
                            <img src="https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <h5 className="card-title">{name}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text">{address}</p>
                            <div className="row">
                                <div className="col">
                                    <p className="card-text"><small className="text-muted">{qualification}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br />
                    <center>
                        <div className="row">
                            <div className="col">
                                <DropRoom id={_id}/>
                            </div>
                            <div className="col">
                                <DropEvent id={_id}/>
                            </div>
                        </div>
                    </center>
                </div>
            </div>
        </>
    )
}
