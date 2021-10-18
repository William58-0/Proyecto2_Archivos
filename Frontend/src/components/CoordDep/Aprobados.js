import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { getAplicantesC } from '../../utils/api';

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

class CoordDepAprobados extends React.Component {
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
        <Link to="/">
          <button style={{ marginLeft: "2%" }} class="btn btn-success">
            Regresar
          </button>
        </Link><br />

        <nav class="navbar navbar-expand-lg navbar-light" style={{ color: "white", marginTop: "2%" }}>
          <div class="collapse navbar-collapse" id="navbarNav">
            <Link to="/coorddep/aprobados" style={{ margin: "auto" }}>
              <button class="btn btn-success">
                <i>Aprobados por Revisores</i>
              </button>
            </Link>

            <Link to="/coorddep/contratados" style={{ margin: "auto" }}>
              <button class="btn btn-info" >
                <i>Contratados</i>
              </button>
            </Link>

          </div>
        </nav >

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
              <h1 style={{ textAlign: "center" }}>Aspirantes Aprobados por Revisores</h1>
              <table class="table table-sm table-hover">
                <tbody class="tblsimbolos">
                  <td>NOMBRE</td>
                  <td>ESTADO</td>
                  <td>FECHA INICIO</td>
                  <td>FECHA FIN</td>
                  <td>ROL</td>
                  <td>DESCARTAR</td>
                  <td>CONTRATAR</td>
                  {arreglo.map(item => (
                    <tr key={item.id}>
                      <td>{item.nombre}</td>
                      <td>{item.estado}</td>
                      <td>{item.inicio}</td>
                      <td>{item.fin}</td>
                      <td>{item.rol}</td>
                      <td>
                        <button class="btn btn-danger" style={{ marginLeft: "2%" }}>
                          Descartar
                        </button>
                      </td>
                      <td>
                        <button class="btn btn-info" style={{ marginLeft: "2%" }}>
                          Contratar
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

export default CoordDepAprobados;