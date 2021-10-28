import React, { useState, useEffect } from 'react'
import { MDBTable, MDBTableBody } from 'mdbreact';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { getMensajes } from '../../utils/api';
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
        Correos
      </Container>
    </div>
  );
};

const GuestMessenger = () => {
  const [mensajes, setMensajes] = useState([]);
  const [perfil, setPerfil] = useState(useParams().dpi);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await getMensajes(perfil)
    var del = response.data.filter(mensaje => mensaje.RECEPTOR === perfil)
    del=del.filter(mensaje => mensaje.EMISOR === 'Sistema')
    setMensajes(del)
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
      <h1 style={{ textAlign: "center", color: "white" }}>Bandeja de Entrada - {perfil}</h1>
      <br />
      <MDBTable scrollY borderless maxHeight="700px" style={{ backgroundColor: "white", marginLeft: "2%", width: "93%" }}>
        <NavBarChat />
        <MDBTableBody >
          {mensajes.map(mensaje => (
            <tr key={mensaje.EMISOR}
              style={{ textAlign: 'left' }}>
              <td style={{ paddingRight: "15%" }} >{mensaje.TEXTO}</td>
            </tr>
          ))}

        </MDBTableBody>
        <div>
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