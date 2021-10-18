import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableEditable } from 'mdbreact';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { getMensajes } from '../../utils/api';
import { Button } from "react-bootstrap";
import ImageButton from 'react-image-button';
//import NavBarRevisor from './NavBarRevisor';

var msj =
  [
    {
      autor: "yo",
      texto: "hola"
    },
    {
      autor: "otro",
      texto: "hola"
    },
    {
      autor: "yo",
      texto: "hola"
    },
    {
      autor: "otro",
      texto: "hola"
    },
    {
      autor: "yo",
      texto: "hola"
    },
    {
      autor: "otro",
      texto: "hola"
    },
  ]

const users = [
  { nombre: "william" },
  { nombre: "Cindy" },
  { nombre: "Roxana" },
  { nombre: "Estrada" },
  { nombre: "Hernández" }
]


const Container = styled.div`
  width: 100%;
  height: 50px;
  color: white;
  background-color: #333;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const NavBarRevisor = () => {
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

function GuestMessenger() {
  const [usuarios, setUsuarios] = useState(users)
  const [mensajes, setMensajes] = useState(msj)
  const [perfil, setPerfil] = useState(useParams().perfil)

  useEffect(() => {
    //getData()
  }, [])

  const getData = async () => {
    const response = await getMensajes(perfil)
    setUsuarios(response.data)
  }

  const abrirMensajes = (nombre) => {
    alert(nombre)
  }

  function imageClick() {
    //alert('Click');
    msj.push({
      autor: "yo",
      texto: "hola"
    })
    msj = msj
    setMensajes(msj)
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

  const renderBody1 = () => {
    return mensajes.map(({ autor, texto }) => {
      return (
        <tr key={autor}
        style={{ textAlign: autor !== "yo" ? 'left' : 'right' }}>
        <td style={{ paddingLeft: "5%" }} >{texto}</td>
      </tr>
      )
    })
  }

  return (
    <>
      <br />
      <Link to="/adminsistema/adminusershome/adminusers">
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
      <table maxHeight="100%" style={{ backgroundColor: "white", marginLeft: "2%", width: "60%" }} >
        <tbody>
          {renderBody1()}
        </tbody>
        <div>
          <Container >
            <input type="text" placeholder="Escribe algo"
              style={{ backgroundColor: "white", marginLeft: "2%", width: "75%" }} />
            <img style={{ borderRadius: '50%', marginLeft: "50%" }}
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCm9en7ZCaKhDe2QxYoMR_sxBSqO7JTeCmbg&usqp=CAU'
              width={50}
              onClick={() => imageClick()}
            />
          </Container>
        </div>
      </table>
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />


    </>
  )
}


export default GuestMessenger