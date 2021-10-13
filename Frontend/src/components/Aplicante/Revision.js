import React from 'react';
import { Link } from 'react-router-dom';
import NavBarAplicante from './NavBarAplicante';
import { Container, Row, Col } from 'reactstrap';

var arreglo = [
  {
    id: 1,
    documento:"curriculum"
  }
]

class AplicanteRevision extends React.Component {
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
        <NavBarAplicante/>
        <br />
        <Link to="/aplicante">
          <button style={{ marginLeft: "2%" }} class="btn btn-success">
            Regresar
          </button>
        </Link><br /><br />
        agregar espacio para los datos<br/>
        <Container style={{ marginTop: "2%" }}>
          <Row>
            <Col>
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
                    <h2 style={{ textAlign: "center" }}>Requisitos</h2>
                    <table class="table table-sm table-hover">
                      <tbody class="tblsimbolos">
                        <td>REQUISITO</td>
                        <td>VER</td>
                        <td>APROBAR</td>
                        {arreglo.map(item => (
                          <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>
                              <button class="btn btn-info" style={{ marginLeft: "2%" }}>
                                VER
                              </button>
                            </td>
                            <td>
                              <button class="btn btn-success" style={{ marginLeft: "2%" }}>
                                APROBAR
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </form>
                </div>
              </div>

            </Col>

            <Col >
              <form style={{
                margin: "auto",
                backgroundColor: "#4884af",
                marginTop: "2%",
                width: "auto",
                padding: "2%",
                borderRadius: "2%",
                color: "white",
                textAlign:"center"
              }}>
                <div style={{ textAlign: "center" }}>
                  <h2>Visualización</h2>
                  <img className="previewimg" src={"../../images/fondo.jpg"} />
                </div>
                <button class="btn btn-info" style={{ marginLeft: "2%" }}>Descargar </button>
              </form>
            </Col>
          </Row>
        </Container>

      </div >

    );
  }
}

export default AplicanteRevision;