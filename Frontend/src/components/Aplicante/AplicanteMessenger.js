import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableEditable } from 'mdbreact';
import styled from 'styled-components';
import { Link, useParams, Redirect } from 'react-router-dom';
import { getMensajes, getRevisorAsignado, sendMessage } from '../../utils/api';
import { Container, Row, Col } from 'reactstrap';
//import NavBarRevisor from './NavBarRevisor';

const Contenedor = styled.div`
  width: 100%;
  height: 50px;
  color: white;
  background-color: #333;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #fff;
  font-weight: bold;
  text-transform: capitalize;
  text-decoration: none;
  margin: 0 20px;
`;

const AplicanteMessenger = () => {
  const [mensajes, setMensajes] = useState([]);
  const [nuevomsj, setNuevoMsj] = useState("");
  const [receptName, setReceptName] = useState(useParams().revisor);
  const [perfil, setPerfil] = useState(useParams().dpi);
  const [departamento, setDep] = useState(useParams().departamento);
  const [puesto, setPuesto] = useState(useParams().puesto);


  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
      const response = await getMensajes(perfil)
      var del = response.data
      //const del=response.data
      del = del.filter(mensaje => mensaje.RECEPTOR == receptName || mensaje.EMISOR == receptName)
      if(del.length==0){
        setMensajes([{ EMISOR: "system", TEXTO: "No hay mensajes para mostrar", RECEPTOR: perfil }])
      }else{
        setMensajes(del)
      }
  }

  useEffect(() => {
    getRevisorA()
  }, "")

  const getRevisorA = async () => {
    const response = await getRevisorAsignado(perfil)
    
    if(response.data.length>0){
        setReceptName(response.data[0].REVISOR)
    }else{
        alert("Ocurrio un error")
    } 
    
  }

  const imageClick = async () => {
    if (receptName != undefined) {
      if (nuevomsj != "") {
        sendMessage(perfil, nuevomsj, receptName);
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
    <Contenedor >
        <StyledLink to="/">201909103</StyledLink>
        <StyledLink to="/">Inicio</StyledLink>
        <StyledLink to={"/aplicante/revision/"+perfil+"/"+departamento+"/"+puesto}>Revision Expediente</StyledLink>
        <StyledLink to={"/aplicante/verificacion/"+perfil+"/"+departamento+"/"+puesto}>Correccion Expediente</StyledLink>
        <StyledLink to={"/aplicante/messenger/"+perfil+"/"+departamento+"/"+puesto}>CHAT</StyledLink>
      </Contenedor>
      <br />
      <Link to={'/revisor/aplicantes/'+perfil}>
        <button style={{ marginLeft: "2%" }} class="btn btn-success">
          Regresar
        </button>
      </Link>
      <br />
      <h1 style={{ textAlign: "center", color: "white" }}>Live Chat</h1>
      <br />
      <MDBTable scrollY borderless maxHeight="700px" style={{ backgroundColor: "white", marginLeft: "2%", width: "93%" }}>
        <Contenedor >
          <div style={{ marginLeft: "2%" }}>
            <img style={{ borderRadius: '50%' }}
              src={'https://www.madd.org/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png'}
              width={50}
            />
            Revisor: {receptName}
          </div>
        </Contenedor>
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
          <Contenedor >
            <input type="text" placeholder="Escribe algo" value={nuevomsj} onChange={(e) => setNuevoMsj(e.target.value)}
              style={{ backgroundColor: "white", marginLeft: "2%", width: "75%" }} />
            <img style={{ borderRadius: '50%', marginLeft: "50%" }}
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCm9en7ZCaKhDe2QxYoMR_sxBSqO7JTeCmbg&usqp=CAU'
              width={50}
              onClick={() => imageClick()}
            />
          </Contenedor>
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


export default AplicanteMessenger