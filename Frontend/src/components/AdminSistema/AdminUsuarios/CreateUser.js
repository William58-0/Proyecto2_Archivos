import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { registrarusuario } from '../../../utils/api';

export default function RegistrarUsuarios() {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");


  const history = useHistory();

  async function RegistrarUsuario(event) {
    event.preventDefault();
    console.log(nombre)
    console.log(password)

  }

  return (
    <div>
        <br /><br />
        <Link to="/adminsistema/adminusershome">
          <button style={{ marginLeft: "2%"}} class="btn btn-success">
            Regresar
          </button>
        </Link>
         <br /><br />
        <br /><br />
      <form style={{ textAlign: "center", alignItems: "center", color: "white" }}>
          <h1 style={{ color: "white" }}>Crear Usuario</h1>

        <FormGroup controlId="usuario" style={{textAlign: "center", marginRight:"40%", marginLeft:"40%" }}>
          <FormLabel>Nombre de Usuario</FormLabel>
          <FormControl
            autoFocus
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" style={{textAlign: "center", marginRight:"40%", marginLeft:"40%" }}>
          <FormLabel>Password</FormLabel>
          <FormControl
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <br />
        <Button block bsSize="large" onClick={RegistrarUsuario}>
          Registrar Usuario
        </Button>
      </form>
      <br /><br />
        <br /><br />
        <br />
    </div>
  );
}