import axios from 'axios';

export function cargamasiva(text) {
  const texto = { texto: text };
  return axios.post('http://localhost:9000/AdminSistema/cargamasiva', texto)
}

export function registrarusuario(name, password, tipo, departamento) {
  const usuario = {nombre:name, contrasenia: password, tipo:tipo, departamento:departamento }; 
  return axios.post('http://localhost:9000/AdminSistema/registrarusuario', usuario)
}

export function editarusuario(original, name, password, tipo, departamento) {
  const usuario = {original: original, nombre:name, contrasenia: password, tipo:tipo, departamento:departamento }; 
  return axios.post('http://localhost:9000/AdminSistema/editarusuario', usuario)
}

export function eliminarusuario(name) {
  const usuario = {nombre: name}; 
  return axios.post('http://localhost:9000/AdminSistema/eliminarusuario', usuario)
}

export function getDepartamentos() {
  return axios.get('http://localhost:9000/getDepartamentos')
}

export function getUsuarios() {
  return axios.get('http://localhost:9000/getUsuarios')
}

export function getUsuario(nombre) {
  return axios.post('http://localhost:9000/getUsuario', nombre)
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
