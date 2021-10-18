import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
//import NavBarRevisor from './NavBarRevisor';

const URL = 'https://jsonplaceholder.typicode.com/users'

const msj=
[
  {
    autor:"yo",
    texto:"hola"
  },
  {
    autor:"otro",
    texto:"hola"
  },
  {
    autor:"yo",
    texto:"hola"
  },
  {
    autor:"otro",
    texto:"hola"
  },
  {
    autor:"yo",
    texto:"hola"
  },
  {
    autor:"otro",
    texto:"hola"
  },
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

const InputMessage = () => {
  return (
    <div>
      <Container >
        <input type="text" placeholder="Escribe algo"
        style={{backgroundColor:"white", marginLeft:"2%", width:"75%"}}/>   
        <img style={{ borderRadius: '50%', marginLeft:"50%" }}
          src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCm9en7ZCaKhDe2QxYoMR_sxBSqO7JTeCmbg&usqp=CAU'}
          width={50}
          alt='Player'
        />
      </Container>
    </div>
  );
};

const Table = () => {
  const [employees, setEmployees] = useState([])
  const [mensajes, setMensajes] = useState(msj)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await axios.get(URL)
    setEmployees(response.data)
  }

  const removeData = (id) => {

    axios.delete(`${URL}/${id}`).then(res => {
      const del = employees.filter(employee => id !== employee.id)
      setEmployees(del)
    })
  }

  const renderBody1 = () => {
    return employees && employees.map(({ id, name, email, phone }) => {
      return (
        <tr key={id}>
          <td> <img style={{ borderRadius: '50%' }}
            src={'https://www.madd.org/wp-content/uploads/2019/02/blank-profile-picture-973460_640.png'}
            width={30}
            alt='Player'
          /></td>
          <td>{name}</td>
          <td className='opration'>
            <button className='button' onClick={() => removeData(id)}>Ver Mensajes</button>
          </td>
        </tr>
      )
    })
  }

  function esPar(num) {
    if (num == 2 || num == 4 || num == 6 || num == 8 || num == 10) {
      return true
    }
    return false

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
      <table id='employee' style={{ float: "left", marginLeft:"2%" }}>
        <tbody style={{ 'height': '100%', 'overflow-y': 'auto', 'display': 'block' }}>
          {renderBody1()}
        </tbody>
      </table>
      <MDBTable scrollY borderless maxHeight="100%" style={{ backgroundColor: "white", marginLeft:"2%", width:"93%" }}>
        <NavBarRevisor />
        <MDBTableBody >
          {mensajes.map(mensaje => (
            <tr key={mensaje.autor} 
              style={{ textAlign: mensaje.autor !== "yo" ? 'left' : 'right' }}>
              <td style={{ paddingLeft: "5%" }} >{mensaje.texto}</td>
            </tr>
          ))}
          
        </MDBTableBody>
        <InputMessage />
      </MDBTable>
      <br /><br />
      <br /><br />
      <br /><br />
      <br /><br />


    </>
  )
}


export default Table