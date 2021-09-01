import React, { useState, useRef } from 'react'
import './StyledInputFiled.css';
import SelectForm from '../selectForm/SelectForm';
import { convertirArchivo, dataURLtoFile } from '../../servicios/servicios';

export const InputFile = ({ extension, selectChange }) => {
  const [base64fromService, setBase64fromService] = useState('');
  const [label, setLabel] = useState('Selecciona un Archivo');
  const [file, setFile] = useState({});
  const [load, setLoad] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const txt = useRef()
  const handleOnChange = (e) => {
    e.preventDefault();
    setLabel(e.target.files[0].name);
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSpinner(true);
    getBase64(file);
  }

  const getBase64 = (file) => {

    var reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {

      let base64 = reader.result;
      let arrayAux = base64.split(',');
      let preRequest = JSON.parse(localStorage.getItem('conversion'));
      const request = {
        base64: arrayAux[1],
        extensionDestino: preRequest.extDestino,
        extensionFuente: preRequest.extOrigen,
        nombreArchivo: label,
      }
      //console.log(arrayAux[1]);
      convertirArchivo(request).then((response) => {
        setBase64fromService(response?.nombreArchivo);

        let { extDestino } = JSON.parse(localStorage.getItem('conversion'));

        switch (extDestino) {
          case 'PDF':
            console.log(base64fromService);
            descargar(response?.base64, 'pdf');
            setLoad(true);
            break;
          case 'ODT':
            console.log(base64fromService);
            descargar(response?.base64, 'vnd.oasis.opendocument.text');
            setLoad(true);
            break;
          case 'DOCX':
            console.log(base64fromService);
            descargar(response?.base64, 'msword');
            setLoad(true);
          case 'XLSX':
            console.log(base64fromService);
            descargar(response?.base64, 'vnd.ms-excel');
            setLoad(true);
          case 'ODS':
            console.log(base64fromService);
            descargar(response?.base64, 'vnd.oasis.opendocument.spreadsheet');
            setLoad(true);
          case 'PPTX':
            console.log(base64fromService);
            descargar(response?.base64, 'vnd.ms-powerpoint');
            setLoad(true);
          case 'ODP':
            console.log(base64fromService);
            descargar(response?.base64, 'vnd.oasis.opendocument.presentation');
            setLoad(true);
        }

      })
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }

  //funcion prueba
  const descargar = (base, ext) => {
    console.log(ext);
    fetch(`data:application/${ext};base64,${base}`)
      .then(response => response.blob())
      .then(blob => txt.current.href = URL.createObjectURL(blob));
    setSpinner(false);
  }

  const handleDownload = () => {
    setTimeout(() => {
      window.location.reload();
    }, 300);
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
          {spinner && <div class="loader">Loading...</div>}
          {load &&
            <a className="button" ref={txt} download={base64fromService} target="_blank" onClick={handleDownload}> Descargar </a>
          }

        </div>
      </form>
    </div>
  )
}

export default InputFile
