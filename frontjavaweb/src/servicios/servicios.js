import axios from 'axios';

const url = 'http://54.163.147.33:8080/convertir';

export const obtenerExtensionDeOrigen = () => {
  let objExtension = JSON.parse(localStorage.getItem('conversion'));
  let extensionOrigen = objExtension.extOrigen;
  console.log(extensionOrigen);
  return extensionOrigen;
}

// export const convertirArchivo = async (obj) => {
//   axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
//   axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
//   console.log(obj);
//   axios.post(url, obj)
//     .then(res => {
//       //console.log(res);
//       console.log(res);
//       //return res.data;
//     }).catch(error => {

//       console.log(error.response.data)

//     })
// }

export const convertirArchivo = async (obj) => {
  const bodyEncoded = Object.keys(obj)
    .map(
      (key) =>
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
    )
    .join('&');

  const response = await fetch(url, {
    method: 'post',
    mode: 'no-cors',
    headers: {
      'Access-Control-Allow-Origin': '*',

    },
    body: bodyEncoded
  });
  console.log(response);
  const data = response.json();
  console.log(data);
}