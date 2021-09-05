import axios from 'axios';

const url = 'http://54.163.147.33:8080/convertir';

export const obtenerExtensionDeOrigen = () => {
  let objExtension = JSON.parse(localStorage.getItem('conversion'));
  let extensionOrigen = objExtension.extOrigen;
  console.log(extensionOrigen);
  return extensionOrigen;
}

export const convertirArchivo = async (obj) => {
  axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
  axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
  console.log(obj);
  try {
    const response = await axios.post(url, obj)
    console.log(response?.data?.base64);
    return response?.data;
  } catch (error) {

    console.log(error);
    return error;
  }

}

//
export const dataURLtoFile = (dataurl, filename) => {

  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}
