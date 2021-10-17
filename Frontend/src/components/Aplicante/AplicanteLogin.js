import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { LoginAplicante } from '../../utils/api';

var arreglo = []



const AplicanteLogin = () => {
  const [dpi, setDPI] = useState("")
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/aplicante/correccion' />
    }
  }

  const IniciarSesion = () => {
    console.log(dpi)
    console.log(password)
    LoginAplicante(dpi, password)
      .then(res => {
        console.log(res)
        if (res.data.length == 0) {
          setRedirect(false)
          alert("Datos incorrectos")
        } else {
          if (res.data[0].ESTADO == "Aceptado") {
            setRedirect(true)
            alert("Bienvenido")
          }else{
            setRedirect(false)
            alert("No es un aplicante")
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
          DPI: <input style={{ marginLeft: "2%", marginBottom: "2%" }}
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