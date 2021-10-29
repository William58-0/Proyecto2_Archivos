import React, { useState, useEffect } from 'react'
import { getAplicantesC } from '../../utils/api';
import { despedirAp, contratarAplicante, abrirDocumento } from '../../utils/api';
import { Link, useParams } from 'react-router-dom';
import { Redirect } from 'react-router';
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

function CoordDepContratados() {
  const [aplicantes, setAplicantes] = useState([])
  const [coordinador, setCoord] = useState(useParams().coordinador)
  const [departamento, setDep] = useState(useParams().departamento)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await getAplicantesC(departamento)
    console.log(response)
    var nuevo = []
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].ESTADO == 'contratado') {
        var nombre = response.data[i].NOMBRES.split(" ", 1)[0] + " " + response.data[i].APELLIDOS.split(" ", 1)[0]
        response.data[i].NOMBRES = nombre
        nuevo.push(response.data[i])
      }
    }

    setAplicantes(nuevo)
  }

  const deleteData = (DPI) => {
    var nuevo = []
    for (let i = 0; i < aplicantes.length; i++) {
      if (aplicantes[i].DPI == DPI) {
        var obj = aplicantes[i]
        obj.FECHAFIN = "hace un momento"
        nuevo.push(obj)
      } else {
        nuevo.push(aplicantes[i])
      }
    }
    setAplicantes(nuevo)
    despedirAp(DPI)
      .then(res => {
        console.log(res)
        alert("Empleado Despedido")
        const del = aplicantes.filter(aplicante => aplicante.DPI !== DPI)
        setAplicantes(del)
      })
      .catch((err) => console.log(err));
    //const del = aplicantes.filter(usuario => NOMBRE !== usuario.NOMBRE)
  }

  const aceptar = (DPI) => {
    contratarAplicante(DPI)
      .then(res => {
        console.log(res)
        alert("Aplicante Contratado!")
        const del = aplicantes.filter(aplicante => aplicante.DPI !== DPI)
        setAplicantes(del)
      })
      .catch((err) => {
        console.log(err)
        alert("Ocurrio un error")
      });
    //const del = aplicantes.filter(usuario => NOMBRE !== usuario.NOMBRE)
  }

  const verExp = (DPI) => {
    abrirDocumento(DPI, "CV", "pdf")
      .then(res => {
        alert("Archivo Cargado")
      })
      .catch((err) => {
        console.log(err)
        alert("Ocurrio un error")
      });
  };

  function OpenFile() {
    window.open(Pdf);
  }

  const renderHeader = () => {
    let headerElement = ['DPI', 'NOMBRE', 'CORREO', 'DIRECCION', 'TELEFONO', 'PUESTO', 'FECHA', 'VER', 'ELIMINAR']
    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  const renderBody = () => {
    return aplicantes.map(({ DPI, NOMBRES, CORREO, DIRECCION, TELEFONO, PUESTO, FECHAINICIO }) => {
      return (
        <tr key={DPI}>
          <td>{DPI}</td>
          <td>{NOMBRES}</td>
          <td>{CORREO}</td>
          <td>{DIRECCION}</td>
          <td>{TELEFONO}</td>
          <td>{PUESTO}</td>
          <td>{FECHAINICIO}</td>

          <td className='opration'>
          <Link to={"/coorddep/contratados/verExp/" + coordinador + "/" + DPI + "/" + departamento }>
              <Button variant="info">Ver Expediente</Button>
            </Link>
          </td>
          <td className='opration'>
            <Button className='button' variant="danger" onClick={() => deleteData(DPI)}>Despedir</Button>
          </td>
        </tr>
      )
    })
  }

  return (
    <>
      <div>
        <Container >
          <StyledLink to="/">201909103</StyledLink>
          <StyledLink to="/">Inicio</StyledLink>
          <StyledLink to={"/coorddep/aprobados/" + departamento + "/" + coordinador}>Aprobados por Revisores</StyledLink>
          <StyledLink to={"/coorddep/contratados/" + departamento + "/" + coordinador}>Contratados</StyledLink>
        </Container>
      </div>

      <br />
      <h1 style={{ textAlign: "center", color: "white" }}>Coordinador: {coordinador} - Departamento: {departamento}</h1>
      <br />

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
            <h1 style={{ textAlign: "center" }}>Personal Contratado en Planilla</h1>
            <br />
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


export default CoordDepContratados