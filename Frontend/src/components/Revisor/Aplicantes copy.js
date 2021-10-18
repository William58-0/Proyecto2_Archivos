import React from 'react';
import { Link } from 'react-router-dom';

var arreglo = [
  {
    id: 1,
    dpi:26327868,
    nombre: "william alejandro borrayo alarcón",
    correo: "activo@gmail.com",
    direccion: "avenida jfkljs",
    telefono: "7889-7879",
    puesto: "jefe",
    fecha: "hoy"
  }
]

class RevisorAplicantes extends React.Component {
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
        <Link to="/revisor">
          <button style={{ marginLeft: "2%" }} class="btn btn-success">
            Regresar
          </button>
        </Link><br /><br />

        <nav class="navbar navbar-expand-lg navbar-light" style={{ color: "white", marginTop: "2%" }}>
          <div class="collapse navbar-collapse" id="navbarNav">
          <Link to="/revisor/aplicantes" style={{ margin: "auto" }}>
              <button class="btn btn-success">
                <i>Aceptar o Rechazar Aplicantes</i>
              </button>
            </Link>

            <Link to="/revisor/revision" style={{ margin: "auto" }}>
              <button class="btn btn-info" >
                <i>Revisión de Expedientes</i>
              </button>
            </Link>
          </div>
        </nav ><br />

        <div style={{ textAlign: "center", color: "white" }}>
          Filtros:
          <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Nombre" name="user" />
          <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Puesto" name="user" />
          <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Fecha de Postulacion" name="user" />
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
                  <td>DPI</td>
                  <td>NOMBRE</td>
                  <td>CORREO</td>
                  <td>DIRECCION</td>
                  <td>TELEFONO</td>
                  <td>PUESTO</td>
                  <td>FECHA POSTULACION</td>
                  <td>CV</td>
                  <td>ACEPTAR</td>
                  <td>RECHAZAR</td>
                  {arreglo.map(item => (
                    <tr key={item.id}>
                      <td>{item.dpi}</td>
                      <td>{item.nombre}</td>
                      <td>{item.correo}</td>
                      <td>{item.direccion}</td>
                      <td>{item.telefono}</td>
                      <td>{item.puesto}</td>
                      <td>{item.fecha}</td>
                      <td>
                        <button class="btn btn-info" style={{ marginLeft: "2%" }}>
                          CV
                        </button>
                      </td>
                      <td>
                        <button class="btn btn-success" style={{ marginLeft: "2%" }}>
                          ACEPTAR
                        </button>
                      </td>
                      <td>
                        <button class="btn btn-danger" style={{ marginLeft: "2%" }}>
                          RECHAZAR
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

export default RevisorAplicantes;