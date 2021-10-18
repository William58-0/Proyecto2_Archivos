import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router';
import { Link, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';

import { getRequisitos } from '../../utils/api';
import { getRevisor } from '../../utils/api';
import { insertAplicante } from '../../utils/api';

function GuestForm() {
  //console.log(useParams())
  const [requisitos, setReq] = useState([]);
  const [departamento, setDep] = useState(useParams().departamento)
  const [puesto, setPuesto] = useState(useParams().puesto)
  const [redirect, setRedirect] = useState(false);
  const [revisor, setRev] = useState("");

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getRev()
  }, "")

  const getData = async () => {
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
    nuevos.push({NOMBRE:"CV",FORMATO:"PDF",TAMANIO:"5",OBLIGATORIO:"Sí"})
    setReq(nuevos)
  }

  const getRev = async () => {
    const responseRev = await getRevisor(departamento)
    console.log(responseRev)
    if (responseRev.data.length > 0) {
      setRev(responseRev.data[0].NOMBRE)
    }else{
      setRev("NO DISPONIBLE")
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

  function EsObg(num){
    if(num==1){
      return "Sí"
    }else{
      return "No"
    }
  }
  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/guest' />
    }
  }

  function probar() {
    console.log(departamento)
    console.log(puesto)
  }

  const [userInfo, setuserInfo] = useState({
    file: [],
    filepreview: null,
  });

  const handleInputChange = (event) => {
    setuserInfo({
      ...userInfo,
      file: event.target.files[0],
      filepreview: URL.createObjectURL(event.target.files[0]),
    });
  }

  const [isSucces, setSuccess] = useState(null);

  const [dpi, setDPI] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");

  const submit = async () => {
    const formdata = new FormData()
    formdata.append('avatar', userInfo.file);
    axios.post("http://localhost:9000/imageupload", formdata, {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then(res => { // then print response status
        console.warn(res);
        if (res.data == "sepudo") {
          alert("Archivo Subido Correctamente!")
        }
      })
  }

  const Enviar = async () => {
    console.log(dpi)
    console.log(nombres)
    console.log(apellidos)
    console.log(correo)
    console.log(direccion)
    console.log(telefono)
    insertAplicante(dpi, nombres, apellidos, correo, direccion, telefono, departamento, puesto)
      .then(res => {
        console.log(res)
        alert("Formulario enviado")
        //alert("ANOTE SU CONTRASEÑA: " + res.data)
        setRedirect(true)
      })
      .catch((err) => {
        console.log(err)
        setRedirect(false)
        alert("Corrija los datos")
      });
  }

  return (
    <div>
      <br />

      <Link to="/guest">
        <button style={{ marginLeft: "2%" }} class="btn btn-success">
          Regresar
        </button>
      </Link>

      <br /><br />
      <h1 style={{ color: "white", textAlign: "center" }}>Puesto: {useParams().puesto} - Departamento: {useParams().departamento} </h1>
      <br /><br />
      <Container>
        <Row style={{ margin: "auto", marginLeft: "10%", marginRight: "10%" }}>
          <Col>
            <form style={{ textAlign: "left", alignItems: "center", color: "white" }}>
              <h3 style={{ color: "white" }}>Ingresar Datos</h3><br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  DPI/CUI:<br />
                </Col>
                <Col>
                  <input type="text" value={dpi} onChange={(e) => setDPI(e.target.value)} /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Nombres:<br />
                </Col>
                <Col>
                  <input type="text" value={nombres} onChange={(e) => setNombres(e.target.value)} /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Apellidos:<br />
                </Col>
                <Col>
                  <input type="text" value={apellidos} onChange={(e) => setApellidos(e.target.value)} /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Correo E:<br />
                </Col>
                <Col>
                  <input type="text" value={correo} onChange={(e) => setCorreo(e.target.value)} /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Direccion:<br />
                </Col>
                <Col>
                  <input type="text" value={direccion} onChange={(e) => setDireccion(e.target.value)} /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Telefono:<br />
                </Col>
                <Col>
                  <input type="text" value={telefono} onChange={(e) => setTelefono(e.target.value)} /><br />
                </Col>
              </Row>
              <br />
            </form>
          </Col>
          <Col>
            <div >
              <div >
                <div className="row">
                  <div className="col-md-12">
                  <p style={{ color: "white" }}>Su revisor será: {revisor}</p>
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
                      <MDBTable scrollY >
                        <MDBTableHead columns={columns} />
                        <MDBTableBody rows={requisitos} />
                      </MDBTable>
                    </form>
                  </div>
                </div>

                <p style={{ color: "white" }}>Utilizar formato: "DPI_REQUISITO", en mayusculas</p>
                <div className="formdesign">
                  {isSucces !== null ? <h4> {isSucces} </h4> : null}
                  <div className="form-row" >
                    <label className="text-white">Seleccionar Documento: </label>
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
            {renderRedirect()}
            <div style={{ textAlign: "center" }}>
              <button class="btn btn-success" onClick={() => Enviar()}>Enviar Formulario</button><br /><br />
            </div>
          </Col>

        </Row>

      </Container>

      <button type="submit" className="btn btn-dark" onClick={probar}> probar </button>



      <br /><br />
      <br /><br />
      <br /><br />


    </div >

  );
}

export default GuestForm;