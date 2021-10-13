import React from 'react';
import { Link } from 'react-router-dom';

var arreglo = [
  {
    id: 1,
    nombre: "hola",
    estado: "activo",
    inicio: "hoy",
    fin: "-",
    rol: "estudiante"
  }
]

class AdminUsers extends React.Component {
  constructor(props) {
    super(props);
    //this.ASimbolos();
    this.state = {
      arreglo: arreglo,
    }
  }

  render() {
    return (
      <div>
        <br />
        <Link to="/adminsistema/adminusershome">
          <button style={{ marginLeft: "2%" }} class="btn btn-success">
            Regresar
          </button>
        </Link><br /><br />

        <div style={{ textAlign: "center", color: "white" }}>
          Filtros:
          <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Nombre" name="user" />
          <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Estado" name="user" />
          <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Fecha Inicio" name="user" />
          <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Fecha FIn" name="user" />
          <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Rol" name="user" />
          <br />
          <button class="btn btn-success" style={{ marginLeft: "2%" }}>
            <i>Filtrar</i>
          </button>
          <button class="btn btn-info" style={{ marginLeft: "2%" }}>
            <i>Quitar Filtros</i>
          </button>
        </div>

        <div className="row">
          <div className="col-md-12">
            <form style={{
              margin: "auto",
              backgroundColor: "#4884af",
              marginTop: "2%",
              width: "auto",
              padding: "2%",
              borderRadius: "2%",
              color: "white"
            }}>
              <h1 style={{ textAlign: "center" }}>Usuarios</h1>
              <table class="table table-sm table-hover">
                <tbody class="tblsimbolos">
                  <td>NOMBRE</td>
                  <td>ESTADO</td>
                  <td>FECHA INICIO</td>
                  <td>FECHA FIN</td>
                  <td>ROL</td>
                  <td>ELIMINAR</td>
                  <td>EDITAR</td>
                  {arreglo.map(item => (
                    <tr key={item.id}>
                      <td>{item.nombre}</td>
                      <td>{item.estado}</td>
                      <td>{item.inicio}</td>
                      <td>{item.fin}</td>
                      <td>{item.rol}</td>
                      <td>
                        <button class="btn btn-danger" style={{ marginLeft: "2%" }}>
                          Eliminar
                        </button>
                      </td>
                      <td>
                        <button class="btn btn-info" style={{ marginLeft: "2%" }}>
                          Editar
                        </button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        </div>
        <br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br />
        <br /><br /><br /><br /><br />

      </div >

    );
  }
}

export default AdminUsers;