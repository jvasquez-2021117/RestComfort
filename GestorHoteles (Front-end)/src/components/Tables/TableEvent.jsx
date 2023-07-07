import React from 'react'

export const TableEvent = ({ name, description, eventType, hotel }) => {
    return (
        <>
            <td>{name}</td>
            <td>{description}</td>
            <td>{eventType}</td>
            <td>{hotel}</td>
        </>
    )
}
