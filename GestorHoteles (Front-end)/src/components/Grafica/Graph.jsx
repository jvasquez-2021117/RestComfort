import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import axios from 'axios'


export const Graph = () => {

  // const [data, setData] = useState([[]]
  //   )
  const [maxReservationsHotel, setMaxReservationsHotel] = useState(null);
  const [data, setData] = useState([
    ["Hoteles", "ress"],

  ]);


  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3200/hotel/getHotelsData');
      console.log('Datos recibidos:', response.data.filteredData);
      const newData = response.data.filteredData.map(({ name, nOfReservations }) => [name, nOfReservations]);

      setData(prevData => {
        const existingNames = new Set(prevData.map(([name]) => name));
        const uniqueData = newData.filter(([name]) => !existingNames.has(name));
        return prevData.concat(uniqueData);
      });

      let maxReservations = -1;
      let maxReservationsHotel = null;
      newData.forEach(([name, nOfReservations]) => {
        if (nOfReservations > maxReservations) {
          maxReservations = nOfReservations;
          maxReservationsHotel = name;
        }
      });

      setMaxReservationsHotel(maxReservationsHotel);


    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };




  useEffect(() => {
    fetchData(setMaxReservationsHotel);
  }, []);



  const options = {
    title: "Most booked hotels"
  };

  useEffect(() => {

    fetchData();
  }, []);
  return (
    <>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"600px"}
      />

      <center><div>
        <h1>The most booked hotel is:</h1>
        {maxReservationsHotel ? (
          <h1>{maxReservationsHotel}</h1>
        ) : (
          <p>Cargando...</p>
        )}

      </div></center>
    </>
  )
}


