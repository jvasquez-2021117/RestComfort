import React from "react";

export const GetRecord = ({name, surname, nit, hotel, room, description, roomPrice, services, consumption}) => {
  return (
    <>
      <li className="list-group" style={{ margin: "5%" }}>
        <div className="card">
          <img src="..." className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{surname}</p>
            <p className="card-text">{nit}</p>
            <p className="card-text">{hotel?.name}</p>
            <p className="card-text">{description}</p>
            <p className="card-text">{roomPrice}</p>
            <p className="card-text">{services}</p>
            <p className="card-text">{consumption}</p>
            <p className="card-text">{room?.name}</p>
            <blockquote className="blockquote mb-0">
              <footer className="blockquote-footer"></footer>
            </blockquote>
          </div>
        </div>
      </li>
    </>
  );
};
