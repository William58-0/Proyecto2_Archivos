import React from 'react';
import styled from 'styled-components';
import NavBarAdminSistema from './NavBarAdminSistema';
import { Link } from 'react-router-dom';

const Form = styled.form`
    margin: auto;   
    width: 100%;
    padding: 2%;
`;

const Container = styled.div`
width: 100%;
height: 600px;
box-sizing: border-box;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
color:white
`;

class AdminUsersHome extends React.Component {
  render() {
    return (
      <div>
        <NavBarAdminSistema />
        <Container>
          <Form>
            <h1 style={{textAlign:"center"}}>Administración de Usuarios</h1>
            <br /><br /><br />
            <div style={{textAlign:"center"}}>
            <Link to="/adminsistema/adminusershome/adminusers">
              <button style={{ marginBottom: "4%", marginLeft:"2%", marginRight:"2%" }} class="btn btn-success">
                Ver Usuarios
              </button>
            </Link>
            <Link to="/adminsistema/adminusershome/createuser">
              <button style={{ marginBottom: "4%", marginLeft:"2%", marginRight:"2%" }} class="btn btn-info">
                Crear Usuario
              </button>
            </Link>
            </div>
          </Form>
        </Container>
      </div>
    );
  }
}

export default AdminUsersHome;