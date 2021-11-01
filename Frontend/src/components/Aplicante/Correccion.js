import React, { useState, useEffect } from 'react'
import { getRevisorAsignado, abrirDocumento, getDocs, getRechazos } from '../../utils/api';
import axios from 'axios';
import styled from 'styled-components';
import { Link, useParams, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Button } from "react-bootstrap";
import Pdf from "../../Documentos/file.pdf";
import Png from "../../Documentos/file.png";
import Jpg from "../../Documentos/file.jpg";
import txt from "../../Documentos/file.txt";

const Contenedor = styled.div`
  width: 100%;
  height: 50px;
  color: white;
  background-color: #333;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: #fff;
  font-weight: bold;
  text-transform: capitalize;
  text-decoration: none;
  margin: 0 20px;
`;

function AplicanteVerificacion() {
  const [dpi, setDPI] = useState(useParams().dpi);
  const [departamento, setDep] = useState(useParams().departamento);
  const [puesto, setPuesto] = useState(useParams().puesto);
  const [revisor, setRev] = useState("");
  const [docsAcept, setDocsAcept] = useState([]);
  const [docsRech, setDocsRech] = useState([]);
  const [rechazos, setRechazos] = useState([]);

  const [formato, setFormat] = useState("");

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  useEffect(() => {
    getDocsAp()
    getRev()
    obtenerRechazos()
  }, [])

  const getDocsAp = async () => {
    const response = await getDocs(dpi)
    console.log(response)
    var nuevosAcept = []
    var nuevosRech = []
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].ESTADO === 'rechazado') {
        nuevosRech.push(response.data[i])
      } else if(response.data[i].ESTADO === 'aceptado') {
        nuevosAcept.push(response.data[i])
      }
    }
    setDocsAcept(nuevosAcept)
    setDocsRech(nuevosRech)
    //setDocs(response.data)
  }

  const getRev = async () => {
    const response = await getRevisorAsignado(dpi)
    if (response.data.length > 0) {
      setRev(response.data[0].REVISOR)
    } else {
      alert("Ocurrio un error")
    }
  }

  const obtenerRechazos = async () => {
    const response = await getRechazos(dpi)
    console.log(response)
    setRechazos(response.data)
    //setDocsRech(nuevosRech)
    //setDocs(response.data)
  }

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  }
  const [isSucces, setSuccess] = useState(null);
  const submit = async () => {
    const formdata = new FormData()
    formdata.append('avatar', userInfo.file);
    axios.post("http://localhost:9000/imageupload", formdata, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => { // then print response status
        console.warn(res);
        alert("Archivo Subido!")
        if (res.data.success === 1) {
          setSuccess("Image upload successfully")
        }
      })
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
      <br /><br />
      <h1 style={{ textAlign: "center", color: "white" }}>Correccion De Expediente - {dpi}</h1>
      <br />
      <Container>
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
                  <h1 style={{ textAlign: "center" }}>Requisitos Rechazados</h1>
                  <MDBTable scrollY style={{ textAlign: "center" }} >
                    <MDBTableHead >
                      <th>Requisito</th>
                      <th>Formato</th>
                    </MDBTableHead >
                    <MDBTableBody style={{ backgroundColor: "white" }} >
                      {docsRech.map(item => (
                        <tr key={item.NOMBRE}>
                          <td>{item.NOMBRE}</td>
                          <td>{item.FORMATO}</td>
                        </tr>
                      ))}
                    </MDBTableBody >
                  </MDBTable>
                </form>
              </div>
            </div>
          </Col>
          <Col>
            <div style={{ textAlign: "center" }}>
              <div >
                <h3 style={{ color: "white" }}>Subir Documentos Corregidos</h3>
                <div className="formdesign">
                  {isSucces !== null ? <h4> {isSucces} </h4> : null}
                  <div className="form-row" style={{ width: "auto", margin: "auto" }}>
                    <label className="text-white">Usar formato: "DPI_REQUISITO", en mayusculas</label>
                    <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} />
                    <br />
                    <div className="form-row" style={{ textAlign: "right" }} >
                      <button type="submit" className="btn btn-dark" onClick={() => submit()}> Subir Documento </button>
                    </div>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <br />
      <div className="row" style={{ width: "80%", margin: "auto" }}>
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
            <h1 style={{ textAlign: "center" }}>Documentos Aceptados</h1>
            <MDBTable scrollY style={{ textAlign: "center" }} >
              <MDBTableHead >
                <th>Requisito</th>
                <th>Formato</th>
                <th>Cargar</th>
              </MDBTableHead >
              <MDBTableBody style={{ backgroundColor: "white" }} >
                {docsAcept.map(item => (
                  <tr key={item.NOMBRE}>
                    <td>{item.NOMBRE}</td>
                    <td>{item.ESTADO}</td>
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
      <br />
      <div className="row" style={{ width: "80%", margin: "auto" }}>
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
            <h1 style={{ textAlign: "center" }}>Historial de Rechazos</h1>
            <MDBTable scrollY style={{ textAlign: "center" }} >
              <MDBTableHead >
                <th>Documento</th>
                <th>Formato</th>
                <th>Fecha</th>
                <th>Motivo</th>
              </MDBTableHead >
              <MDBTableBody style={{ backgroundColor: "white" }} >
                {rechazos.map(item => (
                  <tr key={item.DOCUMENTO}>
                    <td>{item.DOCUMENTO}</td>
                    <td>{item.FORMATO}</td>
                    <td>{item.FECHA}</td>
                    <td>{item.MOTIVO}</td>
                  </tr>
                ))}
              </MDBTableBody >
            </MDBTable>
          </form>
        </div>
      </div>

    </div >
  );
}

export default AplicanteVerificacion;