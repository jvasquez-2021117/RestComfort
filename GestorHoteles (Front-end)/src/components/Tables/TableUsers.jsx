import React from 'react'

export const TableUsers = ({ name, surname, email, role }) => {
    return (
        <>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{email}</td>
            <td>{role}</td>
        </>
    )
}
