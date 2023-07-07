import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Record } from '../components/Record/Record';
import { useNavigate } from 'react-router-dom';

export const RecordPage = () => {

    const [bills, setBills] = useState([{}]);
    const navigate = useNavigate();

    const getBills = async()=>{
        try{
            const { data } = await axios.get('http://localhost:3200/bill/getBill')
            setBills(data.bill)
            console.log(data.bill);
        }catch(e){
            console.log(e);
        }
    }

    useEffect(()=> getBills, [])


    const logOut = () => {
        Swal.fire({
            title: 'Do you want to log out?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Closed session',
                    '',
                    'success',
                );
                localStorage.clear();
                navigate('/');
            }
        });
    }
    return (
        <>
            <div className="container t">
                <div className="row flex-lg-nowrap">
                    <div className="col-12 col-lg-auto mb-3 w1">
                        <Link to={'/profile'} className='nav-link'>
                            <h4>Settings</h4>
                        </Link>
                        <Link to={'/profile/record'} className='nav-link'>
                            <h4>Historial</h4>
                        </Link>
                        <button className='btn btn-danger' onClick={() => logOut()}>Log Out</button>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col mb-5">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="text-center text-sm-left mb-2 mb-sm-0">
                                                <h4 className="pt-sm-2 pb-1 mb-0 text-nowrap">Hosting history</h4>
                                                <div>
                                                    <div className='contenedor'>
                                                        <ul className='list-group list-group-horizontal lista-horizontal'>

                                                            {
                                                                bills.map(({_id, nit, hotel, room, description, roomPrice, services, consumption, total}, index)=>{
                                                                    return(
                                                                        <div key={index}>
                                                                        <Record
                                                                            nit={nit}
                                                                            hotel={hotel?.name}
                                                                            room={room?.name}
                                                                            description={description}
                                                                            roomPrice={roomPrice}
                                                                            consumption={consumption}
                                                                            total={total}
                                                                        ></Record>
                                                                    </div>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </>
    )
}
