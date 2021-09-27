import axios from 'axios';
import decode from 'jwt-decode';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const swal = withReactContent(Swal)
const BASE_URL = "http://localhost:8080/app"

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
});


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.authorization = "Bearer " + token;
      if ((decode(token).exp < Date.now() / 1000)) {
        swal.fire(
          'Por tu seguridad la sesión se ha cerrado',
          '',
          'warning'
        ).then(()=>{
          localStorage.clear()
          window.location.reload()
        })      
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(function (response) {
  if (response.status === 400) {
    return Promise.reject(response.status);
  }
  return response;
}, function (error) {
  if (error.response) {
    swal.fire(
      'Ocurrio algo. '+error.response.data.message,
      '',
      'error'
    )
    return Promise.reject(error.response.data.code);
  } else if (error.request) {
    return Promise.reject(error.request);
  } else {
    return Promise.reject("Ocurrio algo, upps");
  }
});

export default api;


