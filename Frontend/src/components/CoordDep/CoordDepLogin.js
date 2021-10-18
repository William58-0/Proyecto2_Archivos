import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { Login } from '../../utils/api';

var arreglo = []

function RevisorLogin ()  {
  const [name, setName] = useState("")
  const [departamento, setDepartamento] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/revisor/aplicantes/'+departamento} />
    }
  }

  const IniciarSesion = () => {
    console.log(name)
    console.log(password)
    Login(name, password)
      .then(res => {
        console.log(res)
        if (res.data.length == 0) {
          setRedirect(false)
          alert("Datos incorrectos")
        } else {
          if (res.data[0].TIPO == "Coordinador" && res.data[0].ESTADO == "Activo") {
            setDepartamento(res.data[0].DEPARTAMENTO)
            setRedirect(true)
            alert("Bienvenido")
          }else{
            setRedirect(false)
            alert("No es un coordinador activo")
          }
        }
      })
      .catch((err) => console.log(err));
  }

  //this.AErrores()
  return (
    <div>
      <br /><br />
      <Link to="/">
        <button style={{ marginLeft: "2%" }} class="btn btn-success">
          Regresar
        </button>
      </Link>
      <br /><br />
      <br /><br />
      <form style={{ textAlign: "center", alignItems: "center", color: "white" }}>
        <h1 style={{ color: "white" }}>Iniciar Sesión como Coordinador de Departamento</h1>
        <label>
          Nombre de Usuario: <input style={{ marginLeft: "2%", marginBottom: "2%" }}
            type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label><br />
        <label>
          Contraseña: <input style={{ marginLeft: "2%", marginBottom: "2%" }}
            type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label><br />
        <br />
        {renderRedirect()}
        <Button variant="info" onClick={IniciarSesion}>Iniciar Sesión</Button><br /><br />
      </form>
      <br /><br />
      <br /><br />
      <br /><br />
    </div>
  );
}

export default RevisorLogin;