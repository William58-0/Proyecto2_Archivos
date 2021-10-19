import React, { useState, useEffect } from 'react'
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { LoginAplicante } from '../../utils/api';

var arreglo = []

function AplicanteLogin() {
  const [dpi, setDPI] = useState("")
  const [departamento, setDep] = useState("")
  const [puesto, setPuesto] = useState("")
  const [password, setPassword] = useState("");
  const [primer, setPrimer] = useState(1);
  const [redirect, setRedirect] = useState(false);

  const renderRedirect = () => {
    if (redirect) {
      if (primer == 1) {
        return <Redirect to={'/aplicante/verificacion/' + dpi + "/" + departamento + "/" + puesto} />
      } else {
        return <Redirect to={'/aplicante/revision/' + dpi + "/" + departamento + "/" + puesto} />
      }
    }
  }

  const IniciarSesion = () => {
    console.log("hola")
    LoginAplicante(dpi, password)
      .then(res => {
        console.log(res)
        if (res.data.length == 0) {
          setRedirect(false)
          alert("Datos incorrectos")
        } else {
          if (res.data[0].ESTADO == "contratado" || res.data[0].ESTADO == "aceptado" || res.data[0].ESTADO == "revisado") {
            setPrimer(res.data[0].PRIMERLOGIN)
            setDep(res.data[0].DEPARTAMENTO)
            setPuesto(res.data[0].PUESTO)
            setRedirect(true)
            alert("Bienvenido")
          } else {
            setRedirect(false)
            alert("No tiene permisos")
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
        <h1 style={{ color: "white" }}>Iniciar Sesión como Aplicante</h1>
        <label>
          DPI/CUI: <input style={{ marginLeft: "2%", marginBottom: "2%" }}
            type="text" value={dpi} onChange={(e) => setDPI(e.target.value)} />
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

export default AplicanteLogin;