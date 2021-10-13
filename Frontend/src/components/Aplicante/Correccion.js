import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';

function AplicanteCorreccion() {

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
                  <input type="text" name="user" /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Nombres:<br />
                </Col>
                <Col>
                  <input type="text" name="user" /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Apellidos:<br />
                </Col>
                <Col>
                  <input type="text" name="user" /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Correo E:<br />
                </Col>
                <Col>
                  <input type="text" name="user" /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Direccion:<br />
                </Col>
                <Col>
                  <input type="text" name="user" /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-60%" }}>
                  Telefono:<br />
                </Col>
                <Col>
                  <input type="text" name="user" /><br />
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
                  DPI/CUI:<br />
                </Col>
                <Col>
                  <input type="text" name="user" /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-70%" }}>
                  Nombres:<br />
                </Col>
                <Col>
                  <input type="text" name="user" /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-70%" }}>
                  Apellidos:<br />
                </Col>
                <Col>
                  <input type="text" name="user" /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-70%" }}>
                  Correo E:<br />
                </Col>
                <Col>
                  <input type="text" name="user" /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-70%" }}>
                  Direccion:<br />
                </Col>
                <Col>
                  <input type="text" name="user" /><br />
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ marginRight: "-70%" }}>
                  Telefono:<br />
                </Col>
                <Col>
                  <input type="text" name="user" /><br />
                </Col>
              </Row>
              <br />
            </form>

          </Col>
        </Row>
      </Container>

      <div style={{ textAlign: "center" }}>
        <div >
          <h3 style={{ color: "white" }}>Subir Documentos</h3>
          <div className="formdesign">
            {isSucces !== null ? <h4> {isSucces} </h4> : null}
            <div className="form-row" style={{ width: "60%", margin: "auto" }}>
              <label className="text-white">Seleccionar Documento: </label>
              <input type="file" className="form-control" name="upload_file" onChange={handleInputChange} />
              <br />
              <div className="form-row" style={{ textAlign: "right" }} >
                <button type="submit" className="btn btn-dark" onClick={() => submit()}> Subir Documento </button>
              </div>
            </div>

          </div>
          <br />
          {userInfo.filepreview !== null ?
            <img className="previewimg" src={userInfo.filepreview} alt="UploadImage" />
            : null}
        </div>
        <Link to="/aplicante/revision">
          <button class="btn btn-info">Guardar Cambios</button><br /><br />
        </Link>
      </div>
      <br /><br />
      <br /><br />
      <br /><br />


    </div >

  );
}

export default AplicanteCorreccion;