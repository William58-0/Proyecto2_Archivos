import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Redirect, useParams } from 'react-router';
import PropTypes from 'prop-types';
import { Button } from "react-bootstrap";
import { LoginGuest } from '../../utils/api';

var arreglo = []

function RevisorLogin ()  {
  const [dpi, setDPI] = useState("")
  const [correo, setCorreo] = useState("");
  const [redirect, setRedirect] = useState(false);

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/guestLogin/messenger/'+dpi} />
    }
  }

  const IniciarSesion = () => {
    console.log(dpi)
    console.log(correo)
    LoginGuest(dpi, correo)
      .then(res => {
        console.log(res)
        if (res.data.length == 0) {
          setRedirect(false)
          alert("Datos incorrectos")
        } else {
          if (res.data[0].ESTADO == "aceptado" || res.data[0].ESTADO == "pendiente") {
            setRedirect(true)
            alert("Bienvenido")
          }else{
            setRedirect(false)
            alert("Usted ya no es Aplicante")
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
        <h1 style={{ color: "white" }}>Centro de Correo Aplicantes</h1>
        <label>
          DPI/CUI: <input style={{ marginLeft: "2%", marginBottom: "2%" }}
            type="text" value={dpi} onChange={(e) => setDPI(e.target.value)} />
        </label><br />
        <label>
          Correo Electronico: <input style={{ marginLeft: "2%", marginBottom: "2%" }}
            type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} />
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