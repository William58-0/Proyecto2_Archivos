import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { registrarusuario } from '../../../utils/api';
import { getDepartamentos } from '../../../utils/api';
import { Container, Row, Col } from 'reactstrap';

var departamentos = []

const getDep = async () => {
  getDepartamentos()
    .then(res => {
      for (let i = 0; i < res.data.length; i++) {
        if (!departamentos.includes(res.data[i].NOMBRE)) {
          departamentos.push(res.data[i].NOMBRE)
        }
      }
      console.log(departamentos)
    })
    .catch((err) => console.log(err));
}

function CreateUser() {
  getDep()
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("");
  const [departamento, setDepartamento] = useState("");

  const RegistrarUsuario = (event) => {
    console.log(nombre)
    console.log(password)
    console.log(tipo)
    console.log(departamento)

  registrarusuario(nombre, password, tipo, departamento)
    .then(res => {
      console.log(res)
      alert("Usuario creado correctamente")
    })
    .catch((err) => {
      console.log(err)
      alert("Ocurrio un problema")
    });

  }

  return (
    <div>
      <br /><br />
      <Link to="/adminsistema/adminusershome">
        <button style={{ marginLeft: "2%" }} class="btn btn-success">
          Regresar
        </button>
      </Link>
      <br /><br />
      <br /><br />
      <form style={{ textAlign: "center", alignItems: "center", color: "white" }}>
        <h1 style={{ color: "white" }}>Crear Usuario</h1>

        <FormGroup controlId="usuario" style={{ textAlign: "center", marginRight: "40%", marginLeft: "40%" }}>
          <FormLabel>Nombre de Usuario</FormLabel>
          <FormControl
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" style={{ textAlign: "center", marginRight: "40%", marginLeft: "40%" }}>
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup><br />
        <div style={{ textAlign: "center", marginLeft: "25%", marginRight: "15%" }}>
          <Container >
            <Row>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle id="size-dropdown">
                    Tipo
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onSelect={(e) => setTipo("Coordinador")} onChange={(e) => setTipo("Coordinador")}>Coordinador</Dropdown.Item>
                    <Dropdown.Item onSelect={(e) => setTipo("Revisor")} onChange={(e) => setTipo("Revisor")}>Revisor</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              <Col>
                <FormGroup controlId="tipo" style={{ width: "35%" }}>
                  <FormControl
                    type="text"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  />
                </FormGroup>
              </Col>

            </Row>
            <br />
            <Row>
              <Col>
                <Dropdown>
                  <Dropdown.Toggle id="size-dropdown">
                    Departamento
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {departamentos.map(dep => (
                      <Dropdown.Item onSelect={(e) => setDepartamento(dep)} onChange={(e) => setDepartamento(dep)}>{dep}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Col>

              <Col>
                <FormGroup controlId="departamento" style={{ width: "35%" }}>
                  <FormControl
                    type="text"
                    value={departamento}
                    onChange={(e) => setDepartamento(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

          </Container>
        </div>

        <br />

        <Button block bsSize="large" onClick={RegistrarUsuario}>
          Registrar Usuario
        </Button>

      </form>
      <br /><br />
      <br /><br />
    </div>
  );
}

export default CreateUser;