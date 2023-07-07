import React from 'react'

export const TableAdminHotel = ({ name, surname, email, role, hotel }) => {
    return (
        <>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>{hotel}</td>
        </>
    )
}
