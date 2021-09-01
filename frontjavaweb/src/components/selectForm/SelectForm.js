import React, { useState } from 'react'
import './selectForm.css'

export const SelectForm = ({ selectChange }) => {
  const [extensionDestino, setExtensionDestino] = useState([{}]);

  const guardarExtensionOrigen = (e) => {
    e.preventDefault();
    const objExtension = JSON.parse(localStorage.getItem('conversion'));
    objExtension.extOrigen = e.target.value;
    localStorage.setItem('conversion', JSON.stringify(objExtension));
    filtrarExtensionDestino();
    selectChange();

    console.log(localStorage.getItem('conversion'));
  }

  const filtrarExtensionDestino = () => {
    let origin = JSON.parse(localStorage.getItem('conversion'));
    console.log(origin);
    switch (origin.extOrigen) {
      case 'DOCX':
        setExtensionDestino([{ ext: 'ODT', nombre: 'ODT' }]);
        console.log(extensionDestino);
        break;
      case 'ODT':
        setExtensionDestino([{ ext: 'DOCX', nombre: 'DOCX' }]);
        break;
      case 'XLSX':
        setExtensionDestino([{ ext: 'ODS', nombre: 'ODS' }]);
        break;
      case 'ODS':
        setExtensionDestino([{ ext: 'XLSX', nombre: 'XLSX' }]);
        break;
      case 'ODP':
        setExtensionDestino([{ ext: 'PPTX', nombre: 'PPTX' }]);
        break;
      case 'PPTX':
        setExtensionDestino([{ ext: 'ODP', nombre: 'ODP' }]);
        break;
    }
  }

  const guardarExtensionDestino = (e) => {
    e.preventDefault();
    const objExtension = JSON.parse(localStorage.getItem('conversion'));
    objExtension.extDestino = e.target.value;
    localStorage.setItem('conversion', JSON.stringify(objExtension));
    console.log(localStorage.getItem('conversion'));
  }

  return (
    <div className="select-container">
      <select className="select-input" onChange={guardarExtensionOrigen}>
        <option value="DOCX">DOCX</option>
        <option value="ODT">ODT</option>
        <option value="XLSX">XLSX</option>
        <option value="ODS">ODS</option>
        <option value="PPTX">PPTX</option>
        <option value="ODP">ODP</option>
      </select>
      <p className="conector" >a</p>
      <select className="select-input" onChange={guardarExtensionDestino}>
        {
          extensionDestino.map((extension) => {
            return (extension.nombre ? <option value={extension.ext}>{extension.nombre}</option> : <option value="ODT">ODT</option>)
          })
        }
        <option value="PDF">PDF</option>
      </select>
    </div>
  )
}

export default SelectForm;
