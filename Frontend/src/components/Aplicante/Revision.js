import React, { useState, useEffect } from 'react'
import { Link, useParams, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { getRevisorAsignado } from '../../utils/api';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: #fff;
  font-weight: bold;
  text-transform: capitalize;
  text-decoration: none;
  margin: 0 20px;
`;

const Contenedor = styled.div`
  width: 100%;
  height: 50px;
  background-color: #333;
  display: flex;
  justify-content: left;
  align-items: center;
`;

var arreglo = [
  {
    id: 1,
    documento: "curriculum"
  }
]
const AplicanteRevision = () => {
  const [departamento, setDep] = useState(useParams().departamento)
  const [puesto, setPuesto] = useState(useParams().puesto)
  const [dpi, setDPI] = useState(useParams().dpi)
  const [revisor, setRev] = useState("")

  useEffect(() => {
    getRevisorA()
  }, "")

  const getRevisorA = async () => {
    const response = await getRevisorAsignado(dpi)
    console.log("reeevisorr")
    console.log(response.data)
    
    if(response.data.length>0){
        setRev(response.data[0].REVISOR)
    }else{
        alert("Ocurrio un error")
    } 
    
  }

  return (
    <div>
      <Contenedor >
        <StyledLink to="/">201909103</StyledLink>
        <StyledLink to="/">Inicio</StyledLink>
        <StyledLink to={"/aplicante/revision/"+dpi+"/"+departamento+"/"+puesto}>Revision Expediente</StyledLink>
        <StyledLink to={"/aplicante/verificacion/"+dpi+"/"+departamento+"/"+puesto}>Correccion Expediente</StyledLink>
        <StyledLink to={"/aplicante/messenger/"+dpi+"/"+departamento+"/"+puesto+"/"+revisor}>CHAT</StyledLink>
      </Contenedor>
      <br />
      <Link to="/aplicante">
        <button style={{ marginLeft: "2%" }} class="btn btn-success">
          Regresar
        </button>
      </Link><br /><br />
      agregar espacio para los datos<br />
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
              textAlign: "center"
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

export default AplicanteRevision;