import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Form = styled.form`
    margin: auto;  
    margin-right: 8%;
    margin-left: 8%; 
    width: auto;
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

class Home extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <h1>Inicio</h1>
          <Form>
            <Link to="/adminsistema">
              <button style={{ marginBottom: "4%" }} class="btn btn-success">
                Administrador del Sistema
              </button>
            </Link><br />
            <Link to="/coorddep">
              <button style={{ marginBottom: "4%" }} class="btn btn-info">
              Coordinador de Departamento
              </button>
            </Link><br />
            <Link to="/adminsistema/carga">
              <button style={{ marginBottom: "4%" }} class="btn btn-success">
              Revisor de Expediente
              </button>
            </Link><br />
            <Link to="/adminsistema/carga">
              <button style={{ marginBottom: "4%" }} class="btn btn-info">
              Aplicante
              </button>
            </Link><br />
            <Link to="/adminsistema/carga">
              <button style={{ marginBottom: "4%" }} class="btn btn-success">
              Guest
              </button>
            </Link><br />
          </Form>
        </Container>
      </div>
    );
  }
}

export default Home;