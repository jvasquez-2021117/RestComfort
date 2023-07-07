import React from 'react'
import { Graph } from '../components/Grafica/Graph';
import '../components/CSS/style.css'

export const StatisticsPage = () => {

  return (
    <>
    <div style={{backgroundColor: '#b5cea4', height: '200px', justifyContent: 'center',alignItems: 'center', display: 'flex'}}>
     <h1 className="title">HOTEL STATISTICS</h1>
     </div>
    <Graph /> 
    </>
  )
}
