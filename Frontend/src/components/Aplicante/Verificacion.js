import React, { useState, useEffect } from 'react'
import { getDatosAplicante, getRequisitos, actualizarDatos } from '../../utils/api';
import axios from 'axios';
import { Link, useParams, Redirect } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

function AplicanteVerificacion() {
  const [actualDPI, setActDPI] = useState(useParams().dpi);
  const [actualNames, setActNames] = useState("");
  const [actualApe, setActApe] = useState("");
  const [actualCorreo, setActCorreo] = useState("");
  const [actualDir, setActDir] = useState("");
  const [actualTel, setActTel] = useState("");
  const [Names, setNames] = useState("");
  const [Apellidos, setApe] = useState("");
  const [Correo, setCorreo] = useState("");
  const [Direccion, setDir] = useState("");
  const [Telefono, setTel] = useState("");
  const [departamento, setDep] = useState(useParams().departamento);
  const [puesto, setPuesto] = useState(useParams().puesto);
  const [redirect, setRedirect] = useState(false);

  const [requisitos, setReq] = useState([]);

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  useEffect(() => {
    getData()
    getReq()
  }, [])

  useEffect(() => {
    getReq()
  }, [])

  const getData = async () => {
    const response = await getDatosAplicante(actualDPI)
    console.log(response)
    setActNames(response.data[0].NOMBRES)
    setActApe(response.data[0].APELLIDOS)
    setActCorreo(response.data[0].CORREO)
    setActDir(response.data[0].DIRECCION)
    setActTel(response.data[0].TELEFONO)
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
    nuevos.push({ NOMBRE: "CV", FORMATO: "PDF", TAMANIO: "5", OBLIGATORIO: "Sí" })
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

  const Guardar = async () => {
    var envNombres = ""
    var envApellidos = ""
    var envCorreo = ""
    var envDireccion = ""
    var envTelefono = ""
    if (Names == "") { envNombres = actualNames } else { envNombres = Names }
    if (Apellidos == "") { envApellidos = actualApe } else { envApellidos = Apellidos }
    if (Correo == "") { envCorreo = actualCorreo } else { envCorreo = Correo }
    if (Direccion == "") { envDireccion = actualDir } else { envDireccion = Direccion }
    if (Telefono == "") { envTelefono = actualTel } else { envTelefono = envTelefono }
    actualizarDatos(actualDPI, envNombres, envApellidos, envCorreo, envDireccion, envTelefono)
      .then(res => {
        console.log(res)
        setRedirect(true)
        alert("Datos actualizados!")
      })
      .catch((err) => {
        console.log(err)
        setRedirect(false)
        alert("Ocurrio un error")
      });
    // actualizar info
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
      <Link to="/aplicante">
        <button style={{ marginLeft: "2%" }} class="btn btn-success">
          Regresar
        </button>
      </Link>
      <Container>
        <Row style={{ margin: "auto" }}>
          <Col>
            <br /><br />
            <form style={{ textAlign: "left", alignItems: "center", color: "white", marginLeft: "20%" }}>
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

          <Col >
            <br /><br />
            <form style={{ textAlign: "left", alignItems: "center", color: "white" }}>
              <h3 style={{ color: "white" }}>Confirmación de Datos</h3><br />
              <Row>
                <Col style={{ marginRight: "-70%" }}>
                  Nombres:<br />
                </Col>
                <Col>
                  <input type="text" value={Names} onChange={(e) => setNames(e.target.value)} placeholder={actualNames} /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-70%" }}>
                  Apellidos:<br />
                </Col>
                <Col>
                  <input type="text" value={Apellidos} onChange={(e) => setApe(e.target.value)} placeholder={actualApe} /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-70%" }}>
                  Correo E:<br />
                </Col>
                <Col>
                  <input type="text" value={Correo} onChange={(e) => setCorreo(e.target.value)} placeholder={actualCorreo} /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-70%" }}>
                  Direccion:<br />
                </Col>
                <Col>
                  <input type="text" value={Direccion} onChange={(e) => setDir(e.target.value)} placeholder={actualDir} /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-70%" }}>
                  Telefono:<br />
                </Col>
                <Col>
                  <input type="text" value={Telefono} onChange={(e) => setTel(e.target.value)} placeholder={actualTel} /><br />
                </Col>
              </Row>
              <br />
            </form>

          </Col>
        </Row>
      </Container>


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
                    <MDBTableBody rows={requisitos} style={{ backgroundColor: "white" }} />
                  </MDBTable>
                </form>
              </div>
            </div>
          </Col>
          <Col>
            <div style={{ textAlign: "center" }}>
              <div >
                <h3 style={{ color: "white" }}>Subir Documentos</h3>
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
      <div style={{ textAlign: "center" }}>
        {renderRedirect()}
        <button class="btn btn-info" onClick={Guardar}>Guardar Cambios</button><br /><br />

      </div>

      <br />

    </div >

  );
}

export default AplicanteVerificacion;