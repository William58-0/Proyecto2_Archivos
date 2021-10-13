import React from 'react';
import { getSymbols } from '../utils/api';
import { Link } from 'react-router-dom';

var arreglo = []

class tblsym extends React.Component {
  constructor(props) {
    super(props);
    this.ASimbolos();
    this.state = {
      arreglo: arreglo,
    }
  }

  render() {
    this.ASimbolos();
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light" style={{ color: "white", marginTop: "2%" }}>
          <div class="collapse navbar-collapse" id="navbarNav">
            <Link to="/tblsym" style={{ margin: "auto" }}>
              <button class="btn btn-success" onClick={() => { this.ASimbolos() }}>
                <i>Tabla de Símbolos</i>
              </button>
            </Link>

            <Link to="/tblerr" style={{ margin: "auto" }}>
              <button class="btn btn-danger" >
                <i>Tabla de Errores</i>
              </button>
            </Link>

            <Link to="/cst" style={{ margin: "auto" }}>
              <button class="btn btn-info">
                <i>Arbol Sintactico</i>
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
              <h1 style={{ textAlign: "center" }}>Tabla de Simbolos</h1>
              <table class="table table-sm table-hover">
                <tbody class="tblsimbolos">
                  <td>NOMBRE</td>
                  <td>TIPO</td>
                  <td>AMBITO</td>
                  <td>FILA</td>
                  <td>COLUMNA</td>
                  {arreglo.map(item => (
                    <tr key={item.id}>
                      <td>{item.nombre}</td>
                      <td>{item.tipo}</td>
                      <td>{item.ambito}</td>
                      <td>{item.fila}</td>
                      <td>{item.columna}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </form>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />  
        <br />
        <br />
        <br />
        <br />
      </div >
      
    );
  }

  ASimbolos() {
    getSymbols()
      .then(res => {
        console.log(res);
        this.setState({ arreglo: res.data });
        arreglo = res.data;
      })
      .catch((err) => console.log(err));
  }
}

export default tblsym;