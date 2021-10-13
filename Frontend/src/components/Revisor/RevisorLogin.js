import React from 'react';
import { Link } from 'react-router-dom';

var arreglo = []

class RevisorLogin extends React.Component {

  render() {
    //this.AErrores()
    return (
      <div>
        <br /><br />
        <Link to="/">
          <button style={{ marginLeft: "2%"}} class="btn btn-success">
            Regresar
          </button>
        </Link>
        
        <br /><br />
        <br /><br />
        <form style={{ textAlign: "center", alignItems: "center", color: "white" }}>
          <h1 style={{ color: "white" }}>Iniciar Sesión como Revisor de Expedientes</h1>
          <label>
            Nombre de Usuario: <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" name="user" />
          </label><br />
          <label>
            Contraseña: <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="password" name="password" />
          </label><br />
          <br />
          <Link to="/revisor/aplicantes">
          <button class="btn btn-info">Iniciar Sesión</button><br /><br />
          </Link>
        </form>
        <br /><br />
        <br /><br />
        <br /><br />


      </div>
    );
  }


}

export default RevisorLogin;