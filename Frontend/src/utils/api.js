import axios from 'axios';

// --------------------------------------------------------------------------------------- Generales
// Obtiene los departamentos existentes para mostrarlos en el form de crear usuario
export function getDepartamentos() {
  return axios.get('http://localhost:9000/getDepartamentos')
}

// Obtiene los puestos existentes para mostrarlos en el form de crear usuario
export function getPuestos() {
  return axios.get('http://localhost:9000/getPuestos')
}

// Para que un coordinador o revisor pueda entrar a la plataforma
export function Login(nombre, contrasenia) {
  const usuario = { nombre, contrasenia }
  return axios.post('http://localhost:9000/Login', usuario)
}

// Obtiene los coordinadores y revisores
export function getUsuarios() {
  return axios.get('http://localhost:9000/getUsuarios')
}

// Obtiene un coordinador o revisor especifico
export function getUsuario(nombre) {
  return axios.post('http://localhost:9000/getUsuario', nombre)
}

// Obtiene los documentos subidos por un aplicante
export function getDocs(dpi) {
  const info = { dpi }
  return axios.post('http://localhost:9000/getDocs', info)
}

// Obtiene los mensajes para un perfil(puede ser dpi en caso de ser aplicante o un nombre en caso de coordinador/revisor)
export function getMensajes(perfil) {
  const user = { perfil }
  return axios.post('http://localhost:9000/getMensajes', user)
}

// Inserta un mensaje
export function sendMessage(emisor, texto, receptor) {
  const msj = { emisor, texto, receptor }
  return axios.post('http://localhost:9000/sendMessage', msj)
}

// Abrir Documento(en realidad lo copia del backend como file a documentos del frontend)
export function abrirDocumento(dpi, documento, formato) {
  documento = documento.toUpperCase()
  const info = { dpi, documento, formato }
  return axios.post('http://localhost:9000/abrirDocumento', info)
}

// --------------------------------------------------------------------------------------- AdminUsers
// Para cargar el xml
export function cargamasiva(text) {
  const texto = { texto: text };
  return axios.post('http://localhost:9000/AdminSistema/cargamasiva', texto)
}

// Para registrar un coordinador o revisor
export function registrarusuario(name, password, tipo, departamento) {
  const usuario = { nombre: name, contrasenia: password, tipo: tipo, departamento: departamento };
  return axios.post('http://localhost:9000/AdminSistema/registrarusuario', usuario)
}

// Para actualizar los datos de un coordinador o revisor
export function editarusuario(original, name, password, tipo, departamento) {
  const usuario = { original: original, nombre: name, contrasenia: password, tipo: tipo, departamento: departamento };
  return axios.post('http://localhost:9000/AdminSistema/editarusuario', usuario)
}

// Para eliminar un coordinador o revisor (solo cambia su estado a inactivo)
export function eliminarusuario(name) {
  const usuario = { nombre: name };
  return axios.post('http://localhost:9000/AdminSistema/eliminarusuario', usuario)
}

// ------------------------------------------------------------------------------------------ CoordDep
// Obtiene los aplicantes de su departamento
export function getAplicantesC(dept) {
  return axios.post('http://localhost:9000/CoordDep/getAplicantes', dept)
}

// Obtiene los empleados de su departamento
export function getEmpleadosC(dept) {
  return axios.post('http://localhost:9000/CoordDep/getEmpleados', dept)
}

// ------------------------------------------------------------------------------------------ Revisor
// Obtiene los aplicantes de su departamento
export function getAplicantesR(rev) {
  const info = { rev }
  return axios.post('http://localhost:9000/Revisor/getAplicantesR', info)
}

// Obtiene los empleados de su departamento
export function getEmpleadosR(dept) {
  const departamento = { dept }
  return axios.post('http://localhost:9000/Revisor/getEmpleadosR', departamento)
}

// Acepta a un aplicante
export function aceptarAplicante(dpi) {
  const aplicante = { dpi }
  return axios.post('http://localhost:9000/Revisor/aceptarAplicante', aplicante)
}

// Acepta un archivo de aplicante
export function aceptarArchivo(dpi, documento, formato, revisor) {
  documento = documento.toUpperCase()
  const archivo = { dpi, documento, formato, revisor }
  return axios.post('http://localhost:9000/Revisor/aceptarArchivo', archivo)
}

// Ingresa un rechazo
export function rechazarDoc(documento, motivo, formato, dpi) {
  documento = documento.toUpperCase()
  const rechazo = { documento, motivo, formato, dpi }
  return axios.post('http://localhost:9000/Revisor/rechazarDoc', rechazo)
}

// ------------------------------------------------------------------------------------------ Aplicante
// Para que un aplicante pueda entrar a la plataforma
export function LoginAplicante(dpi, contrasenia) {
  const aplicante = { dpi, contrasenia }
  return axios.post('http://localhost:9000/Aplicante/LoginAplicante', aplicante)
}

// Obtiene los datos de un aplicante
export function getDatosAplicante(dpi) {
  const info = { dpi }
  return axios.post('http://localhost:9000/Aplicante/getDatosAplicante', info)
}

// Obtiene el listado de requisitos de un puesto
export function getRequisitos(departamento, puesto) {
  const info = { departamento, puesto }
  return axios.post('http://localhost:9000/getRequisitos', info)
}

// actualiza los datos del aplicante
export function actualizarDatos(dpi, nombres, apellidos, correo, direccion, telefono) {
  const info = { dpi, nombres, apellidos, correo, direccion, telefono }
  return axios.post('http://localhost:9000/Aplicante/actualizarDatos', info)
}

// Obtiene el revisor asignado para un aplicante
export function getRevisorAsignado(dpi) {
  const info = { dpi }
  return axios.post('http://localhost:9000/Aplicante/getRevisorAsignado', info)
}

// Obtiene el listado de rechazos de un aplicante
export function getRechazos(dpi) {
  const info = { dpi }
  return axios.post('http://localhost:9000/Aplicante/getRechazos', info)
}

// ------------------------------------------------------------------------------------------ Guest
// Calificar puesto
export function CalifPuesto(puesto, departamento, calificacion) {
  const info = { puesto, departamento, calificacion }
  return axios.post('http://localhost:9000/Guest/califPuesto', info)
}

// Obtiene el revisor con menos carga para asignarselo al guest
export function getRevisor(departamento) {
  const dept = { departamento }
  return axios.post('http://localhost:9000/Guest/getRevisor', dept)
}

// Inserta los datos del nuevo aplicante, tambien suma el trabajo del revisor asignado
export function insertAplicante(dpi, nombres, apellidos, correo, direccion, telefono, depart, puesto, revisor) {
  const aplicante = { dpi, nombres, apellidos, correo, direccion, telefono, depart, puesto, revisor }
  return axios.post('http://localhost:9000/Guest/insertAplicante', aplicante)
}

// ------------------------------------------------------------------------------------------ CorreosGuest
// Para que un guest pueda entrar a sus correos
export function LoginGuest(dpi, correo) {
  const aplicante = { dpi, correo }
  return axios.post('http://localhost:9000/CorreoGuest/LoginGuest', aplicante)
}