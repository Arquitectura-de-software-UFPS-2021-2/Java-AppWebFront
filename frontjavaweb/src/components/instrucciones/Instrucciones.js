import React from 'react'
import './StyledInstrucciones.css'

export const Instrucciones = () => {
  return (
    <div className="instrucciones-container">
      <div className="pasos">
        <h2>Paso 1</h2>
        <p>Seleccione el archivo desde el ordenador</p>
      </div>

      <div className="pasos">
        <h2>Paso 2</h2>
        <p>Elija el formato al cual desea convertir</p>
      </div>

      <div className="pasos">
        <h2>Paso 3</h2>
        <p>Descargue su archivo convertido</p>
      </div>

    </div>
  )
}

export default Instrucciones;