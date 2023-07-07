import React from 'react'

export const TableHotel = ({name, description, address, qualification}) => {
    return (
        <>
        <td>{name}</td>
        <td>{description}</td>
        <td>{address}</td>
        <td>{qualification}</td>        
        </>
    )
}
