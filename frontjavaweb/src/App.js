import { useEffect, useState } from 'react';
import InputFile from './components/inputFile/InputFile';
import './App.css';
import Header from './components/header/Header';
import Instrucciones from './components/instrucciones/Instrucciones';
import { obtenerExtensionDeOrigen } from './servicios/servicios';

function App() {

  const [extArchivo, setExtArchivo] = useState('DOCX')

  let conversion = {
    extOrigen: 'DOCX',
    extDestino: 'ODT',
  }

  localStorage.setItem('conversion', JSON.stringify(conversion));

  const cambioDeSelect = () => {
    console.log('desde app');
    setExtArchivo(obtenerExtensionDeOrigen());
  }

  useEffect(() => {
    setExtArchivo(obtenerExtensionDeOrigen());
  }, [InputFile]);

  return (
    <div className="App-container">
      <Header></Header>
      <div className="tittle-container">
        <h1 className="tittle">Conversor de archivos</h1>
        <p>Convierte tus archivos a cualquier formato</p>
      </div>
      <section className="flujo-container">
        <div className="formulario">
          <div className="form-container">
            <InputFile extension={'.' + extArchivo} selectChange={cambioDeSelect}></InputFile>
          </div>
        </div>
        <div className="instrucciones">
          <Instrucciones></Instrucciones>
        </div>
      </section>
    </div>
  );
}

export default App;
