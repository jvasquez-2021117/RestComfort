import React from 'react'

export const TableServices = ({ name, description, price }) => {
    return (
        <>
            <td>{name}</td>
            <td>{price}</td>
        </>
    )
}
