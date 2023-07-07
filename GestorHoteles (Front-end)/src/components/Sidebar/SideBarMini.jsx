import React from 'react'
import '../CSS/style.css'

export const SideBarMini = () => {
    return (
        <>
            <div className='card-body' id='cardB'>
                <form>
                    <div className="row">
                        <div className="">
                            <label htmlFor="inputDestination">Destino</label>
                            <input type="text" className="form-control" id="inputDestination" placeholder="Introduce tu destino" />
                        </div>
                        <div className="">
                            <label htmlFor="inputCheckIn">Check-in</label>
                            <input type="date" className="form-control" id="inputCheckIn" />
                        </div>
                        <div className="">
                            <label htmlFor="inputCheckOut">Check-out</label>
                            <input type="date" className="form-control" id="inputCheckOut" />
                        </div>
                    </div>
                    <div className="">
                        <div className="">
                            <label htmlFor="inputGuests">Huéspedes</label>
                            <select className="form-control" id="inputGuests">
                                <option>1 adulto</option>
                                <option>2 adultos</option>
                                <option>3 adultos</option>
                                <option>4 adultos</option>
                            </select>
                        </div>
                        <div className="">
                            <label htmlFor="inputPrice">Precio máximo por noche</label>
                            <select className="form-control" id="inputPrice">
                                <option>Cualquier precio</option>
                                <option>Menos de $50</option>
                                <option>Menos de $100</option>
                                <option>Menos de $200</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
