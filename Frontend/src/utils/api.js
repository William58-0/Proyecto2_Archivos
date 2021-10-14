import axios from 'axios';

export function cargamasiva(text) {
  const texto = { texto: text };
  return axios.post('http://localhost:9000/AdminSistema/cargamasiva', texto)
}

export function getC3D(text) {
  const texto = { texto: text };
  return axios.post('http://localhost:9000/getC3D', texto)
}

export function getSymbols() {
  return axios.get('http://localhost:9000/tblsym')
}

export function getErrores() {
  return axios.get('http://localhost:9000/tblerr')
}

export function getCST() {
  return axios.get('http://localhost:9000/cst')
}
