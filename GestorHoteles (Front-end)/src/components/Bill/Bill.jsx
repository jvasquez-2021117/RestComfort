export const Bill2 = ({ name, surname, nit, hotel, room, roomPrice, services, consumption, total }) => {
    return (
        <>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{nit}</td>
            <td>{hotel}</td>
            <td>{room}</td>
            <td>{roomPrice}</td>
            <td>{services}</td>
            <td>{consumption}</td>
            <td>{total}</td>
        </>
    )
}