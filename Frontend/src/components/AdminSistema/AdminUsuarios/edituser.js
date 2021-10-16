import React, { Component, useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Dropdown } from "react-bootstrap";
import { Link, useParams } from 'react-router-dom';
import { editarusuario } from '../../../utils/api';
import { getDepartamentos } from '../../../utils/api';
import { getUsuario } from '../../../utils/api';
import AdminUsersHome from '../AdminUsersHome';
import { Container, Row, Col } from 'reactstrap';
import toastr from "toastr";
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

var departamentos = []
var original = ""

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

const volver = <Route
  path="/adminsistema/adminusershome/adminusers"
  exact
  component={AdminUsersHome}
/>

function EditUser() {
  console.log(useParams())
  original = useParams().nombre
  var nombreVar = ""
  var passwordVar = ""
  var tipoVar = ""
  var departamentoVar = ""
  getDep()
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [tipo, setTipo] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [nombreDef, setNombreDef] = useState("");
  const [passwordDef, setPasswordDef] = useState("");
  const [tipoDef, setTipoDef] = useState("");
  const [departamentoDef, setDepartamentoDef] = useState("");

  //const GetUser = async () => {
  getUsuario({ "original": original })
    .then(res => {
      console.log(res)
      setNombreDef(original)
      setPasswordDef(res.data[0].CONTRASENIA)
      setTipoDef(res.data[0].TIPO)
      setDepartamentoDef(res.data[0].DEPARTAMENTO)
    })
    .catch((err) => console.log(err));
  //}

  const ActualizarUsuario = (event) => {

    if (nombre == "") { nombreVar = nombreDef } else { nombreVar = nombre }
    if (password == "") { passwordVar = passwordDef } else { passwordVar = password }
    if (tipo == "") { tipoVar = tipoDef } else { tipoVar = tipo }
    if (departamento == "") { departamentoVar = departamentoDef } else { departamentoVar = departamento }

    console.log(nombreVar)
    console.log(passwordVar)
    console.log(tipoVar)
    console.log(departamentoVar)

    editarusuario(original, nombreVar, passwordVar, tipoVar, departamentoVar)
      .then(res => {
        console.log(res)
        return volver
      })
      .catch((err) => console.log(err));

  }

  return (
    <div>
      <br /><br />
      <Link to="/adminsistema/adminusershome/adminusers">
        <button style={{ marginLeft: "2%" }} class="btn btn-success">
          Regresar
        </button>
      </Link>
      <br /><br />
      <br /><br />
      <form style={{ textAlign: "center", alignItems: "center", color: "white" }}>
        <h1 style={{ color: "white" }}>Editar Usuario {original}</h1>

        <FormGroup controlId="usuario" style={{ textAlign: "center", marginRight: "40%", marginLeft: "40%" }}>
          <FormLabel>Nombre de Usuario</FormLabel>
          <FormControl
            type="text"
            value={nombre}
            defaultValue={nombreDef}
            placeholder={nombreDef}
            onChange={(e) => setNombre(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" style={{ textAlign: "center", marginRight: "40%", marginLeft: "40%" }}>
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            defaultValue={passwordDef}
            placeholder={passwordDef}
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
                    defaultValue={tipoDef}
                    placeholder={tipoDef}
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
                    defaultValue={departamentoDef}
                    placeholder={departamentoDef}
                    onChange={(e) => setDepartamento(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>

          </Container>
        </div>

        <br />

        <Button block bsSize="large" onClick={ActualizarUsuario}>
          Guardar Cambios
        </Button>

      </form>
      <br /><br />
      <br /><br />
    </div>
  );
}

export default EditUser;