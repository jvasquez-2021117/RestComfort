import React from 'react'

export const TableRooms = ({ name, noGuest, price, roomType, availability, hotel }) => {
    return (
        <>
            <td>{name}</td>
            <td>{noGuest}</td>
            <td>{price}</td>
            <td>{roomType}</td>
            <td>{availability}</td>
            <td>{hotel}</td>
        </>
    )
}
