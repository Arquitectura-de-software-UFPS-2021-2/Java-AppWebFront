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

  const response = await axios.post(url, obj)
  console.log(response?.data?.base64);
  return response?.data;
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

 //Usage example:
 //var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=','hello.txt');
 //console.log(file);

//------------------------------------------------------------------------------
// export const convertirArchivo = async (obj) => {
//   const bodyEncoded = Object.keys(obj)
//     .map(
//       (key) =>
//         encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
//     )
//     .join('&');

//   const response = await fetch(url, {
//     method: 'post',
//     mode: 'no-cors',
//     headers: {
//       'Access-Control-Allow-Origin': '*',

//     },
//     body: bodyEncoded
//   });
//   console.log(response);
//   const data = response.json();
//   console.log(data);
// }