import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableEditable } from 'mdbreact';
import styled from 'styled-components';
import { Link, useParams, Redirect } from 'react-router-dom';
import { getMensajes, getAplicantesR, sendMessage } from '../../utils/api';
//import NavBarRevisor from './NavBarRevisor';

const Container = styled.div`
  width: 100%;
  height: 50px;
  color: white;
  background-color: #333;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const GuestMessenger = () => {
  const [aplicantes, setAplicantes] = useState([])
  const [mensajes, setMensajes] = useState([]);
  const [nuevomsj, setNuevoMsj] = useState("");
  const [receptName, setReceptName] = useState("Seleccionar un Aplicante");
  const [receptDPI, setReceptDPI] = useState(useParams().receptor);
  const [perfil, serPerfil] = useState(useParams().revisor);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    if (receptDPI == undefined) {
      setMensajes([{ EMISOR: "system", TEXTO: "No hay mensajes para mostrar", RECEPTOR: perfil }])
    } else {
      const response = await getMensajes(perfil)
      var del = response.data
      //const del=response.data
      del = del.filter(mensaje => mensaje.RECEPTOR == receptDPI || mensaje.EMISOR == receptDPI)
      if(del.length==0){
        setMensajes([{ EMISOR: "system", TEXTO: "No hay mensajes para mostrar", RECEPTOR: perfil }])
      }else{
        setMensajes(del)
      }
      //window.location.reload();
    }
  }

  useEffect(() => {
    getConv()
  }, [])

  const getConv = async () => {
    const response = await getAplicantesR(perfil)
    console.log(response.data)
    var nuevo = []
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].ESTADO == 'aceptado') {
        var nombre = response.data[i].NOMBRES.split(" ", 1)[0] + " " + response.data[i].APELLIDOS.split(" ", 1)[0]
        response.data[i].NOMBRES = nombre
        nuevo.push(response.data[i])
        if (response.data[i].DPI == receptDPI) {
          setReceptName(nombre)
        }
      }
    }
    setAplicantes(nuevo)
  }

  const renderRedirect = () => {
    if (redirect) {
      window.location.reload();
      return <Redirect to={'/revisor/messenger/' + perfil + '/' + receptDPI} />
      
    }
  }

  const renderBody = () => {
    return aplicantes && aplicantes.map(({ DPI, NOMBRES }) => {
      return (
        <tr key={DPI}>
          <td> <img style={{ borderRadius: '50%' }}
            src={'https://www.madd.org/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png'}
            width={30}
          /></td>
          <td style={{ color: "white" }}>{NOMBRES}</td>
          <td className='opration'>
            <button className='button' onClick={() => selecConv(DPI, NOMBRES)}>Ver Mensajes</button>
          </td>
        </tr>
      )
    })
  }

  const selecConv = (dpi, name) => {
    //alert(dpi)
    setReceptName(name)
    setReceptDPI(dpi)
    setRedirect(true)
    /*
    var del = []
    del = mensajes.filter(mensaje => mensaje.RECEPTOR == dpi || mensaje.EMISOR == dpi)
    if (del.length == 0) {
      del.push({ EMISOR: dpi, TEXTO: "No hay mensajes para mostrar", RECEPTOR: perfil })
    }
    setMensajes(del)
    */

  }

  const imageClick = async () => {
    //alert(nuevomsj);
    if (receptDPI != undefined) {
      if (nuevomsj != "") {
        sendMessage(perfil, nuevomsj, receptDPI);
        window.location.reload();
      } else {
        alert("Escriba un mensaje")
      }
    } else {
      alert("Seleccione una conversacion")
    }
  }

  return (
    <>
      <br />
      <Link to={'/revisor/aplicantes/'+perfil}>
        <button style={{ marginLeft: "2%" }} class="btn btn-success">
          Regresar
        </button>
      </Link>
      <br />
      <h1 style={{ textAlign: "center", color: "white" }}>Live Chat</h1>
      <br />
      <table style={{ float: "left", marginLeft: "2%" }}>
        <tbody style={{ 'height': '100%', 'overflow-y': 'auto', 'display': 'block' }}>
          {renderBody()}
        </tbody>
      </table>
      <MDBTable scrollY borderless maxHeight="100%" style={{ backgroundColor: "white", marginLeft: "2%", width: "93%" }}>
        <Container >
          <div style={{ marginLeft: "2%" }}>
            <img style={{ borderRadius: '50%' }}
              src={'https://www.madd.org/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png'}
              width={50}
            />
            {receptName}
          </div>
        </Container>
        <MDBTableBody >
          {mensajes.map(mensaje => (
            <tr key={mensaje.EMISOR}
              style={{ textAlign: mensaje.EMISOR !== perfil ? 'left' : 'right' }}>
              <td style={{
                paddingLeft: mensaje.EMISOR !== perfil ? '5%' : '15%',
                paddingRight: mensaje.EMISOR !== perfil ? '15%' : '5%',
              }} >{mensaje.TEXTO}</td>
            </tr>
          ))}

        </MDBTableBody>
        <div>
          <Container >
            <input type="text" placeholder="Escribe algo" value={nuevomsj} onChange={(e) => setNuevoMsj(e.target.value)}
              style={{ backgroundColor: "white", marginLeft: "2%", width: "75%" }} />
            {renderRedirect()}
            <img style={{ borderRadius: '50%', marginLeft: "50%" }}
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCm9en7ZCaKhDe2QxYoMR_sxBSqO7JTeCmbg&usqp=CAU'
              width={50}
              onClick={() => imageClick()}
            />
          </Container>
        </div>
      </MDBTable>
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
      <br /><br /><br /><br />
    </>
  )
}


export default GuestMessenger