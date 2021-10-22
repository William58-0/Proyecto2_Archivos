import React, { useState, useEffect } from 'react'
import { getDatosAplicante, getDocs, abrirDocumento, aceptarArchivo, rechazarDoc } from '../../utils/api';
import { Link, useParams, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Button } from "react-bootstrap";
import Pdf from "../../Documentos/file.pdf";
import Png from "../../Documentos/file.png";
import Jpg from "../../Documentos/file.jpg";
import txt from "../../Documentos/file.txt";

function CoordDepVerExp() {
  const [actualNames, setActNames] = useState("");
  const [actualApe, setActApe] = useState("");
  const [actualCorreo, setActCorreo] = useState("");
  const [actualDir, setActDir] = useState("");
  const [actualTel, setActTel] = useState("");

  const [departamento, setDep] = useState(useParams().departamento);
  const [coordinador, setRev] = useState(useParams().coordinador);
  const [dpi, setDPI] = useState(useParams().dpi);

  const [docs, setDocs] = useState([]);
  const [formato, setFormat] = useState("");

  useEffect(() => {
    getData()
    getDocsAp()
  }, [])

  const getData = async () => {
    const response = await getDatosAplicante(dpi)
    console.log(response)
    setActNames(response.data[0].NOMBRES)
    setActApe(response.data[0].APELLIDOS)
    setActCorreo(response.data[0].CORREO)
    setActDir(response.data[0].DIRECCION)
    setActTel(response.data[0].TELEFONO)
    //setAplicantes(response.data)
  }

  const getDocsAp = async () => {
    const response = await getDocs(dpi)
    console.log(response)
    //var del = response.data.filter(documento => documento.ESTADO == 'pendiente')
    // se unifican los formatos
    setDocs(response.data)
  }

  const CargarArchivo = (DPI, DOCUMENTO, FORMATO) => {
    abrirDocumento(DPI, DOCUMENTO, FORMATO)
      .then(res => {
        setFormat(FORMATO);
        alert("Archivo Cargado");
      })
      .catch((err) => {
        console.log(err);
        alert("Ocurrio un error");
      });
  };

  function OpenFile() {
    if (formato == "pdf") {
      window.open(Pdf);
    } else if (formato == "png") {
      window.open(Png);
    } else if (formato == "jpg") {
      window.open(Jpg);
    } else {
      window.open(txt);
    }
  }

  return (
    <div>
      <br />
      <Link to={"/coorddep/contratados/"+ departamento+"/"+ coordinador}>
        <button style={{ marginLeft: "2%" }} class="btn btn-success">
          Regresar
        </button>
      </Link>
      <h1 style={{ textAlign: "center", color: "white" }}>Empleado: {dpi}</h1>
      <br />
      <Container>
        <Row>
        <Col>
            <form style={{ textAlign: "left", alignItems: "center", color: "white", marginLeft: "20%" }}>
              <h3 style={{ color: "white" }}>Datos Actuales</h3><br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Nombres:<br />
                </Col>
                <Col>
                  <input type="text" value={actualNames} readOnly={true} /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Apellidos:<br />
                </Col>
                <Col>
                  <input type="text" value={actualApe} readOnly={true} /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Correo E:<br />
                </Col>
                <Col>
                  <input type="text" value={actualCorreo} readOnly={true} /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Direccion:<br />
                </Col>
                <Col>
                  <input type="text" value={actualDir} readOnly={true} /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Telefono:<br />
                </Col>
                <Col>
                  <input type="text" value={actualTel} readOnly={true} /><br />
                </Col>
              </Row>
              <br />
            </form>
          </Col>

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
                  <h1 style={{ textAlign: "center" }}>Documentos del Empleado</h1>

                  <MDBTable scrollY style={{ textAlign: "center" }} >
                    <MDBTableHead >
                      <th>Requisito</th>
                      <th>Formato</th>
                      <th>Cargar</th>
                    </MDBTableHead >
                    <MDBTableBody style={{ backgroundColor: "white" }} >
                      {docs.map(item => (
                        <tr key={item.NOMBRE}>
                          <td>{item.NOMBRE}</td>
                          <td>{item.FORMATO}</td>
                          <td>
                            <Button variant="info" onClick={() => CargarArchivo(item.APLICANTE, item.NOMBRE, item.FORMATO)}>Cargar</Button>
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody >
                  </MDBTable>
                  <br />
                  <div style={{ textAlign: "right" }}>
                    <Button variant="info" onClick={() => OpenFile()} >Ver Documento Cargado</Button>
                  </div>

                </form>
              </div>
            </div>
          </Col>

        </Row>
      </Container>
      <br />
      <br /><br /><br /><br /><br /><br /> 
    </div >

  );
}

export default CoordDepVerExp;