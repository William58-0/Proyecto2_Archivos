import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableEditable } from 'mdbreact';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { getMensajes } from '../../utils/api';
import { sendMessage } from '../../utils/api';
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

const NavBarChat = () => {
  return (
    <div>
      <Container >
        <img style={{ borderRadius: '50%' }}
          src={'https://www.madd.org/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png'}
          width={50}
          alt='Player'
        />
        Nombre de la persona
      </Container>
    </div>
  );
};

const GuestMessenger = () => {
  const [usuarios, setUsuarios] = useState([])
  const [mensajes, setMensajes] = useState([]);
  const [nuevomsj, setNuevoMsj] = useState([]);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await getMensajes('william580')
    console.log(response.data)
    setUsuarios(response.data.users)
    setMensajes(response.data.mensajes)
    //setUsuarios(response.data)
  }

  const abrirMensajes = (nombre) => {
    alert(nombre)
  }

  const imageClick = async () => {
    alert(nuevomsj);
    sendMessage('william580', nuevomsj, 2797652900101)

    window.location.reload();

  }

  const renderBody = () => {
    return usuarios.map(({ nombre }) => {
      return (
        <tr key={nombre}>
          <td> <img style={{ borderRadius: '50%' }}
            src={'https://www.madd.org/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png'}
            width={30}
          /></td>
          <td style={{ color: "white" }}>{nombre}</td>
          <td className='opration'>
            <button className='button' onClick={() => abrirMensajes(nombre)}>Ver Mensajes</button>
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <br />
      <Link to="/guestLogin">
        <button style={{ marginLeft: "2%" }} class="btn btn-success">
          Regresar
        </button>
      </Link>
      <br />
      <h1 style={{ textAlign: "center", color: "white" }}>Mensajes</h1>
      <br />
      <table style={{ float: "left", marginLeft: "2%" }}>
        <tbody style={{ 'height': '100%', 'overflow-y': 'auto', 'display': 'block' }}>
          {renderBody()}
        </tbody>
      </table>
      <MDBTable scrollY borderless maxHeight="100%" style={{ backgroundColor: "white", marginLeft: "2%", width: "93%" }}>
        <NavBarChat />
        <MDBTableBody >

          {mensajes.map(mensaje => (
            <tr key={mensaje.EMISOR}
              style={{ textAlign: mensaje.EMISOR !== "william580" ? 'left' : 'right' }}>
              <td style={{ paddingLeft: "5%" }} >{mensaje.TEXTO}</td>
            </tr>
          ))}

        </MDBTableBody>
        <div>
          <Container >
            <input type="text" placeholder="Escribe algo" value={nuevomsj} onChange={(e) => setNuevoMsj(e.target.value)}
              style={{ backgroundColor: "white", marginLeft: "2%", width: "75%" }} />
            <img style={{ borderRadius: '50%', marginLeft: "50%" }}
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCm9en7ZCaKhDe2QxYoMR_sxBSqO7JTeCmbg&usqp=CAU'
              width={50}
              onClick={() => imageClick()}
            />
          </Container>
        </div>
      </MDBTable>
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />


    </>
  )
}


export default GuestMessenger