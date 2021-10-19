import React, { useState, useEffect } from 'react'
import { getRequisitos, getDocs, abrirDocumento, aceptarArchivo, sendMessage } from '../../utils/api';
import axios from 'axios';
import { Link, useParams, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Button } from "react-bootstrap";
import Pdf from "../../Documentos/file.pdf";
import Png from "../../Documentos/file.png";
import Jpg from "../../Documentos/file.jpg";
import txt from "../../Documentos/file.txt";

function AplicanteVerificacion() {
  const [departamento, setDep] = useState(useParams().departamento);
  const [puesto, setPuesto] = useState(useParams().puesto);
  const [revisor, setRev] = useState(useParams().revisor);
  const [dpi, setDPI] = useState(useParams().dpi);
  const [mensaje, setMensaje] = useState("");

  const [requisitos, setReq] = useState([]);
  const [docs, setDocs] = useState([]);
  const [formato, setFormat] = useState("");

  useEffect(() => {
    getReq()
    getDocsAp()
  }, [])

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
    var del = response.data.filter(documento => documento.ESTADO == 'pendiente' || documento.ESTADO == 'rechazado')
    // se unifican los formatos
    setDocs(del)
  }

  function EsObg(num) {
    if (num == 1) {
      return "Sí"
    } else {
      return "No"
    }
  }

  const columns = [
    {
      label: 'Requisito'
    },
    {
      label: 'Formatos'
    },
    {
      label: 'Tamaño'
    },
    {
      label: 'Obligatorio'
    }
  ]

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

  const aceptArchivo = (DPI, DOCUMENTO, FORMATO) => {
    aceptarArchivo(DPI, DOCUMENTO, FORMATO, revisor)
      .then(res => {
        alert("Archivo aceptado");
        var del = docs.filter(documento => documento.NOMBRE !== DOCUMENTO || documento.FORMATO !== FORMATO)
        setDocs(del)
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

  const enviarMensage = async () => {
    //alert(nuevomsj);
    if (mensaje != "") {
      sendMessage(revisor, mensaje, dpi);
      setMensaje("");
      alert("Mensaje enviado");
    } else {
      alert("Escriba un mensaje")
    }
  }

  return (
    <div>
      <br />
      <Link to={"/revisor/revision/" + revisor}>
        <button style={{ marginLeft: "2%" }} class="btn btn-success">
          Regresar
        </button>
      </Link>
      <h1 style={{ textAlign: "center", color: "white" }}>Aplicante: {dpi}</h1>
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
                  <h1 style={{ textAlign: "center" }}>Requisitos</h1>
                  <MDBTable scrollY  >
                    <MDBTableHead columns={columns} />
                    <MDBTableBody style={{ backgroundColor: "white" }} >
                      {requisitos.map(item => (
                        <tr key={item.NOMBRE}>
                          <td>{item.NOMBRE}</td>
                          <td>{item.FORMATO}</td>
                          <td>{item.TAMANIO}</td>
                          <td>{item.OBLIGATORIO}</td>
                        </tr>
                      ))}
                    </MDBTableBody >
                  </MDBTable>
                </form>
              </div>
            </div>
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
                  <h1 style={{ textAlign: "center" }}>No Aceptados</h1>

                  <MDBTable scrollY style={{ textAlign: "center" }} >
                    <MDBTableHead >
                      <th>Requisito</th>
                      <th>Formato</th>
                      <th>Cargar</th>
                      <th>Aceptar</th>
                      <th>Rechazar</th>
                    </MDBTableHead >
                    <MDBTableBody style={{ backgroundColor: "white" }} >
                      {docs.map(item => (
                        <tr key={item.NOMBRE}>
                          <td>{item.NOMBRE}</td>
                          <td>{item.FORMATO}</td>
                          <td>
                            <Button variant="info" onClick={() => CargarArchivo(item.APLICANTE, item.NOMBRE, item.FORMATO)}>Cargar</Button>
                          </td>
                          <td>
                            <Button variant="success" onClick={() => aceptArchivo(item.APLICANTE, item.NOMBRE, item.FORMATO)} >Aceptar</Button>
                          </td>
                          <td>
                            <Button variant="danger" >Rechazar</Button>
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
      <br />
      <h3 style={{ marginLeft: "10%", color: "white" }}>Nuevo Mensaje:</h3>
      <div style={{ marginLeft: "10%" }}>
        <textarea
          cols="140"
          rows="2"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></textarea>
      </div>
      <br />
      <div style={{ textAlign: "right", marginRight: "10%" }}>
        <button class="btn btn-success" onClick={() => enviarMensage()}>Enviar Mensaje</button><br /><br />
      </div>
      <br />
    </div >

  );
}

export default AplicanteVerificacion;