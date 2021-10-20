import React, { useState, useEffect } from 'react'
import { getAplicantesR } from '../../utils/api';
import { Link, useParams } from 'react-router-dom';
import { Button } from "react-bootstrap";
import styled from 'styled-components';
import Pdf from "../../Documentos/file.pdf";

var original = []

const StyledLink = styled(Link)`
  color: #fff;
  font-weight: bold;
  text-transform: capitalize;
  text-decoration: none;
  margin: 0 20px;
`;

const Container = styled.div`
  width: 100%;
  height: 50px;
  background-color: #333;
  display: flex;
  justify-content: left;
  align-items: center;
`;

function RevisorRevision() {
  const [aplicantes, setAplicantes] = useState([])
  const [revisor, serRev] = useState(useParams().revisor)
  const [filName, setFilName] = useState("");
  const [filPuesto, setFilPuesto] = useState("");
  const [filEstado, setFilEstado] = useState("");

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await getAplicantesR(revisor)
    console.log(response)
    var nuevo = []
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].ESTADO == 'pendiente' || response.data[i].ESTADO == 'revisado' || response.data[i].ESTADO == 'aceptado') {
        var nombre = response.data[i].NOMBRES.split(" ", 1)[0] + " " + response.data[i].APELLIDOS.split(" ", 1)[0]
        response.data[i].NOMBRES = nombre
        nuevo.push(response.data[i])
      }
    }
    setAplicantes(nuevo)
  }

  const renderHeader = () => {
    let headerElement = ['DPI', 'NOMBRE', 'CORREO', 'DIRECCION', 'TELEFONO', 'PUESTO', 'ESTADO', 'VER EXPEDIENTE']
    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  const renderBody = () => {
    return aplicantes.map(({ DPI, NOMBRES, CORREO, DIRECCION, TELEFONO, PUESTO, ESTADO, DEPARTAMENTO }) => {
      return (
        <tr key={DPI}>
          <td>{DPI}</td>
          <td>{NOMBRES}</td>
          <td>{CORREO}</td>
          <td>{DIRECCION}</td>
          <td>{TELEFONO}</td>
          <td>{PUESTO}</td>
          <td>{ESTADO}</td>

          <td className='opration'>
            <Link to={"/revisor/revision/verExp/"+revisor+"/"+DPI+"/"+DEPARTAMENTO+"/"+PUESTO}>
              <Button variant="info">Ver Expediente</Button>
              </Link>
          </td>
        </tr>
      )
    })
  }

  const filtrar = () => {
    if (original.length == 0) {
      original = aplicantes
    } else {
      setAplicantes(original)
    }
    var del = aplicantes
    if (filName != "") {
      del = aplicantes.filter(aplicante => aplicante.NOMBRES == filName)
      setAplicantes(del)
    } if (filPuesto != "") {
      del = aplicantes.filter(aplicante => aplicante.PUESTO == filPuesto)
      setAplicantes(del)
    } if (filEstado != "") {
      del = aplicantes.filter(aplicante => aplicante.ESTADO == filEstado)
      setAplicantes(del)
    }

  }

  function quitarFiltros() {
    window.location.reload();
  }

  return (
    <>
      <div>
        <Container >
          <StyledLink to="/">201909103</StyledLink>
          <StyledLink to="/">Inicio</StyledLink>
          <StyledLink to={"/revisor/aplicantes/" + revisor}>Aceptar/Rechazar Aplicantes</StyledLink>
          <StyledLink to={"/revisor/revision/" + revisor}>Revisión de Expediente</StyledLink>
          <StyledLink to={"/revisor/messenger/" + revisor}>CHAT</StyledLink>
        </Container>
      </div>
      <br />
      <h1 style={{ textAlign: "center", color: "white" }}>Revisor: {revisor}</h1>
      <br />
      <div style={{ textAlign: "center", color: "white" }}>
        Filtros:
        <input style={{ marginLeft: "2%", marginBottom: "2%" }}
          type="text" placeholder="Nombre"
          value={filName}
          onChange={(e) => setFilName(e.target.value)}
        />
        <input style={{ marginLeft: "2%", marginBottom: "2%" }}
          type="text" placeholder="Puesto"
          value={filPuesto}
          onChange={(e) => setFilPuesto(e.target.value)}
        />
        <input style={{ marginLeft: "2%", marginBottom: "2%" }}
          type="text" placeholder="Estado"
          value={filEstado}
          onChange={(e) => setFilEstado(e.target.value)}
        />
        <Button variant="success" style={{ marginLeft: "2%" }} onClick={filtrar}>
          <i>Filtrar</i>
        </Button>
        <Button variant="info" style={{ marginLeft: "2%" }} onClick={quitarFiltros}>
          <i>Quitar Filtros</i>
        </Button>
      </div>

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
            <h1 style={{ textAlign: "center" }}>Revision de Expedientes</h1>
            <table class="table table-sm table-hover" >
              <thead class="tblsimbolos">
                <tr>{renderHeader()}</tr>
              </thead>
              <tbody class="tblsimbolos">
                {renderBody()}
              </tbody>
            </table>
          </form>
        </div>
      </div>

      <br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br />
    </>
  )
}


export default RevisorRevision