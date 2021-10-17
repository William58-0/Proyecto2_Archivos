import axios from 'axios';
import { useParams } from 'react-router';

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

export function getPuestos() {
  return axios.get('http://localhost:9000/getPuestos')
}

export function Login(nombre, contrasenia) {
  const usuario={ nombre, contrasenia }
  return axios.post('http://localhost:9000/Login', usuario)
}

export function LoginAplicante(dpi, contrasenia) {
  const aplicante={ dpi, contrasenia }
  return axios.post('http://localhost:9000/Aplicante/LoginAplicante', aplicante)
}

export function getUsuarios() {
  return axios.get('http://localhost:9000/getUsuarios')
}

export function getUsuario(nombre) {
  return axios.post('http://localhost:9000/getUsuario', nombre)
}

export function getRequisitos(departamento, puesto) {
  const info = { departamento, puesto }
  return axios.post('http://localhost:9000/getRequisitos', info)
}

export function getRevisor(departamento) {
  const dept = { departamento }
  return axios.post('http://localhost:9000/Aplicante/getRevisor', dept)
}

export function insertAplicante(dpi, nombres, apellidos, correo, direccion, telefono, depart, puesto, revisor) {
  const aspirante = { dpi, nombres, apellidos, correo, direccion, telefono, depart, puesto, revisor }
  return axios.post('http://localhost:9000/Aplicante/insertAplicante', aspirante)
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
