import React, { useState, useEffect } from 'react'
import { getDatosAplicante, getRequisitos, actualizarDatos } from '../../utils/api';
import axios from 'axios';
import { Link, useParams, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import { Button } from "react-bootstrap";

function AplicanteVerificacion() {
  const [actualDPI, setActDPI] = useState(useParams().dpi);
  const [departamento, setDep] = useState(useParams().departamento);
  const [puesto, setPuesto] = useState(useParams().puesto);
  const [redirect, setRedirect] = useState(false);
  const [revisor, setRev] = useState(useParams().revisor);
  const [dpi, setDPI] = useState(useParams().dpi);
  const [mensaje, setMensaje] = useState("");

  const [requisitos, setReq] = useState([]);

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  useEffect(() => {
    getReq()
  }, [])

  useEffect(() => {
    getReq()
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

  function EsObg(num) {
    if (num == 1) {
      return "Sí"
    } else {
      return "No"
    }
  }

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to={'/aplicante/revision/' + actualDPI + "/" + departamento + "/" + puesto} />
    }
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
    axios.post("http://localhost:8080/imageupload", formdata, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => { // then print response status
        console.warn(res);
        if (res.data.success === 1) {
          setSuccess("Image upload successfully")
        }
      })
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

                  <MDBTable scrollY style={{textAlign:"center"}} >
                    <MDBTableHead >
                    <th>Requisito</th>
                    <th>Formato</th>
                    <th>Cargar</th>
                    <th>Aceptar</th>
                    <th>Rechazar</th>
                    </MDBTableHead >
                    <MDBTableBody style={{ backgroundColor: "white" }} >
                      {requisitos.map(item => (
                        <tr key={item.NOMBRE}>
                          <td>{item.NOMBRE}</td>
                          <td>{item.FORMATO}</td>
                          <td>
                          <Button variant="info" >Cargar</Button>
                          </td>
                          <td>
                          <Button variant="success" >Aceptar</Button>
                          </td>
                          <td>
                          <Button variant="danger" >Rechazar</Button>
                          </td>
                        </tr>
                      ))}
                    </MDBTableBody >
                  </MDBTable>
                  <div style={{textAlign:"right"}}>
                  <Button variant="info" >Ver Documento Cargado</Button>
                  </div>
                  
                </form>
              </div>
            </div>
          </Col>

        </Row>
      </Container>
      <br />
      <h3 style={{marginLeft:"10%", color:"white"}}>Nuevo Mensaje:</h3>
      <div style={{ marginLeft:"10%" }}>
        <textarea
          cols="140"
          rows="2"
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        ></textarea>
      </div>
      <br />
      <div style={{ textAlign: "right", marginRight:"10%"}}>
        <button class="btn btn-success" >Enviar Mensaje</button><br /><br />
      </div>
      <br />
    </div >

  );
}

export default AplicanteVerificacion;