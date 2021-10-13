import axios from 'axios';

export function compilar(text) {
  const texto = { texto: text };
  return axios.post('http://127.0.0.1:5000/analizar', texto)
}

export function getC3D(text) {
  const texto = { texto: text };
  return axios.post('http://127.0.0.1:5000/getC3D', texto)
}

export function getSymbols() {
  return axios.get('http://127.0.0.1:5000/tblsym')
}

export function getErrores() {
  return axios.get('http://127.0.0.1:5000/tblerr')
}

export function getCST() {
  return axios.get('http://127.0.0.1:5000/cst')
}
