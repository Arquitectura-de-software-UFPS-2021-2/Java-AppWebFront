import React, { useState } from 'react'
import './StyledInputFiled.css';
import SelectForm from '../selectForm/SelectForm';
import { convertirArchivo } from '../../servicios/servicios';

export const InputFile = ({ extension, selectChange }) => {
  const [label, setLabel] = useState('Selecciona un Archivo');
  const [file, setFile] = useState({});
  const handleOnChange = (e) => {
    e.preventDefault();
    setLabel(e.target.files[0].name);
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getBase64(file);
  }

  const getBase64 = (file) => {

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {

      let base64 = reader.result;
      let arrayAux = base64.split(',');
      let preRequest = JSON.parse(localStorage.getItem('conversion'));
      console.log(file);
      const request = {
        base64: arrayAux[1],
        extensionDestino: preRequest.extDestino,
        extensionFuente: preRequest.extOrigen,
        nombreArchivo: label,
      }
      console.log(request);
      convertirArchivo(request);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };


  }

  return (
    <div>
      <form className="inputFile-container" onSubmit={handleSubmit}>
        <div className="inputs">
          <div className="file-picker">
            <input type="file" accept={extension} name="file" id="file" class="inputfile" onChange={handleOnChange} />
            <label for="file"><i class="fas fa-upload"></i>{label}</label>
          </div>
          <div className="selects">
            <SelectForm selectChange={selectChange}></SelectForm>
          </div>
        </div>
        <div className="button-container">
          <button className="button">Convertir</button>
        </div>
      </form>
    </div>
  )
}

export default InputFile
