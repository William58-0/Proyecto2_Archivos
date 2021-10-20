import React, { useState, useEffect } from 'react'
import { getRequisitos, getDocs, abrirDocumento, getDatosAplicante } from '../../utils/api';
import { Link, useParams, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Button } from "react-bootstrap";
import styled from 'styled-components';
import Pdf from "../../Documentos/file.pdf";
import Png from "../../Documentos/file.png";
import Jpg from "../../Documentos/file.jpg";
import txt from "../../Documentos/file.txt";

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

function AplicanteRevision() {
  const [actualDPI, setActDPI] = useState(useParams().dpi);
  const [actualNames, setActNames] = useState("");
  const [actualApe, setActApe] = useState("");
  const [actualCorreo, setActCorreo] = useState("");
  const [actualDir, setActDir] = useState("");
  const [actualTel, setActTel] = useState("");

  const [departamento, setDep] = useState(useParams().departamento);
  const [puesto, setPuesto] = useState(useParams().puesto);
  const [revisor, setRev] = useState();
  const [dpi, setDPI] = useState(useParams().dpi);

  const [requisitos, setReq] = useState([]);
  const [docs, setDocs] = useState([]);
  const [formato, setFormat] = useState("");

  useEffect(() => {
    getData()
    getReq()
    getDocsAp()
  }, [])

  const getData = async () => {
    const response = await getDatosAplicante(actualDPI)
    console.log(response)
    setActNames(response.data[0].NOMBRES)
    setActApe(response.data[0].APELLIDOS)
    setActCorreo(response.data[0].CORREO)
    setActDir(response.data[0].DIRECCION)
    setActTel(response.data[0].TELEFONO)
    setRev(response.data[0].REVISOR)
    //setAplicantes(response.data)
  }

  const getReq = async () => {
    const response = await getRequisitos(departamento, puesto)
    console.log(response)
    // se unifican los formatos
    var escritos = []
    var nuevos = []
    for (let i = 0; i < response.data.length; i++) {
      if (!escritos.includes(response.data[i].NOMBRE)) {
        var actual = response.data[i].NOMBRE
        var formatos = response.data[i].FORMATO
        for (let j = 0; j < response.data.length; j++) {
          if (response.data[j].NOMBRE == actual && !escritos.includes(response.data[j].NOMBRE) && i != j) {
            formatos += ", " + response.data[j].FORMATO
          }
        }
        var nuevo = {
          NOMBRE: actual,
          FORMATO: formatos,
          TAMANIO: response.data[i].TAMANIO,
          OBLIGATORIO: EsObg(response.data[i].OBLIGATORIO)
        }
        nuevos.push(nuevo)
        escritos.push(response.data[i].NOMBRE)
      }
    }
    setReq(nuevos)
  }

  const getDocsAp = async () => {
    const response = await getDocs(dpi)
    console.log(response)
    var alerta=false
    for(let i=0;i<response.data.length;i++){
      if(response.data[i].ESTADO=='rechazado'){
        alerta=true;
        i=response.data.length;
      }
    }
    // se unifican los formatos
    setDocs(response.data)
    if(alerta){
      alert("Usted tiene archivos rechazados")
    }
  }

  function EsObg(num) {
    if (num == 1) {
      return "Sí"
    } else {
      return "No"
    }
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
      <Contenedor >
        <StyledLink to="/">201909103</StyledLink>
        <StyledLink to="/">Inicio</StyledLink>
        <StyledLink to={"/aplicante/revision/" + dpi + "/" + departamento + "/" + puesto}>Revision Expediente</StyledLink>
        <StyledLink to={"/aplicante/correccion/" + dpi + "/" + departamento + "/" + puesto}>Correccion Expediente</StyledLink>
        <StyledLink to={"/aplicante/messenger/" + dpi + "/" + departamento + "/" + puesto + "/" + revisor}>CHAT</StyledLink>
      </Contenedor>
      <br />
      <h1 style={{ textAlign: "center", color: "white" }}>Revision de Expediente - {dpi}</h1>
      <h3 style={{ textAlign: "center", color: "white" }}>Departamento: {departamento} - Puesto: {puesto}</h3>
      <br />
      <Container>
        <Row>
          <Col>
            <form style={{ textAlign: "left", alignItems: "center", color: "white", marginLeft:"20%"}}>
              <h3 style={{ color: "white" }}>Datos Actuales</h3><br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  DPI/CUI:<br />
                </Col>
                <Col>
                  <input type="text" value={actualDPI} readOnly={true} /><br />
                </Col>
              </Row>
              <br />
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
                  <h1 style={{ textAlign: "center" }}>Sus Documentos</h1>

                  <MDBTable scrollY style={{ textAlign: "center" }} >
                    <MDBTableHead >
                      <th>Requisito</th>
                      <th>Formato</th>
                      <th>Estado</th>
                      <th>Cargar</th>
                    </MDBTableHead >
                    <MDBTableBody style={{ backgroundColor: "white" }} >
                      {docs.map(item => (
                        <tr key={item.NOMBRE}>
                          <td>{item.NOMBRE}</td>
                          <td>{item.FORMATO}</td>
                          <td>{item.ESTADO}</td>
                          <td>
                            <Button variant="info" onClick={() => CargarArchivo(item.APLICANTE, item.NOMBRE, item.FORMATO)}>Cargar</Button>
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody >
                  </MDBTable>
                  <div style={{ textAlign: "right" }}>
                    <Button variant="info" onClick={() => OpenFile()} >Ver Documento Cargado</Button>
                  </div>

                </form>
              </div>
            </div>
          </Col>

        </Row>
      </Container>
      <br /><br /><br /><br /><br />

    </div >

  );
}

export default AplicanteRevision;