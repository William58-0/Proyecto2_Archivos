import React from 'react';
import { getErrores } from '../../../utils/api';
import { Link } from 'react-router-dom';

var arreglo = []

class edituser extends React.Component {
  constructor(props) {
    super(props);
    this.AErrores();
    this.state = {
      arreglo: arreglo,
    }
  }

  render() {
    //this.AErrores()
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
          <label>
            Usuario: <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" name="user" />
          </label><br />
          <label>
            Contraseña: <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="password" name="password" />
          </label><br /><br />

          <button class="btn btn-info" onClick={() => { this.AErrores() }}>Guardar Cambios</button><br /><br />

        </form>
        <br /><br />
        <br /><br />
        <br /><br />


      </div>
    );
  }

  AErrores() {
    getErrores()
      .then(res => {
        console.log(res);
        this.setState({ arreglo: res.data });
        arreglo = res.data;
      })
      .catch((err) => console.log(err));
  }
}

export default edituser;