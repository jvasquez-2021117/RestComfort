import React from 'react'
import record from '../../assets/record.jpg'

export const Record = ({nit, hotel, room, description, roomPrice, consumption}) => {
  return (
    <>
{/*             <div className="card mb-3">
                <div className="card-body ">
                    <div className="row g-10">
                        <div className="col-md-4">
                            <img src="https://pix10.agoda.net/hotelImages/124/1246280/1246280_16061017110043391702.jpg?ca=6&ce=1&s=1024x768" className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <h5 className="card-title">{hotel}</h5>
                            <p className="card-text">{room} | Q: {roomPrice}</p>
                            <p className="card-text">{description}</p>
                            <div className="row">
                                <div className="col">
                                    <p className="card-text"><small className="text-muted">{nit}</small></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <li className='list-group' style={{margin: '5%'}}>
                <div className="card">
                    <div className='justify-content-center'>
                        <img src={record} className="card-img-top" alt="..." />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{hotel}</h5>                        
                        <p className="card-text">{room} | Q: {roomPrice}</p>
                        <p className="card-text">{description}</p>
                        <blockquote className="blockquote mb-0">                            
                            <footer className="blockquote-footer">{nit}</footer>
                        </blockquote>
                    </div>
                </div>
            </li>
    </>
  )
}
