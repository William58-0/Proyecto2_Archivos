import React, { useState, useEffect } from 'react'
import { Rep1Puestos, Rep1ApEmp, Rep1CoordRev, getDepartamentos } from '../../utils/api';
import { Link, useParams } from 'react-router-dom';
import { Button, FormGroup, Dropdown, FormControl } from "react-bootstrap";
import { Row, Col } from 'reactstrap';
import styled from 'styled-components';


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

var original = []
var departamentos = []

function Organigrama() {
  const [puestos, setPuestos] = useState([])
  const [apliemp, setApliEmp] = useState([])
  const [coordrev, setCoordRev] = useState([])
  const [departamento, setDep] = useState("")
  const [data, setData] = useState([])

  useEffect(() => {
    getDep();
    getData();
  }, [])

  const getDep = async () => {
    getDepartamentos()
      .then(res => {
        for (let i = 0; i < res.data.length; i++) {
          if (!departamentos.includes(res.data[i].NOMBRE)) {
            departamentos.push(res.data[i].NOMBRE)
          }
        }
      })
      .catch((err) => console.log(err));
  }

  const getData = async () => {

    const respPuestos = await Rep1Puestos()
    console.log(respPuestos)

    if (departamento == "") {
      setPuestos(respPuestos.data)
    } else {
      var del = respPuestos.data
      del = respPuestos.data.filter(depa => String(depa.DEPARTAMENTO) == String(departamento))
      setPuestos(del)
    }

    const respApliEmp = await Rep1ApEmp()
    console.log(respApliEmp)

    if (departamento == "") {
      setApliEmp(respApliEmp.data)
    } else {
      var del = respApliEmp.data
      del = respApliEmp.data.filter(depa => depa.DEPARTAMENTO == departamento)
      setApliEmp(del)
    }
    
    const respCoordRev = await Rep1CoordRev()
    console.log(respCoordRev)

    setCoordRev(respCoordRev.data)

    /*
    const respPuestos = await Rep1Puestos()
    console.log(respPuestos)
    setPuestos(respPuestos.data)
   
    const respApliEmp = await Rep1ApEmp()
    console.log(respApliEmp)
    setApliEmp(respApliEmp.data)

    const respCoordRev = await Rep1CoordRev()
    console.log(respCoordRev)
    setCoordRev(respCoordRev.data)
*/
  }

  const renderHeaderPuestos = () => {
    let headerElement = ['DEPARTAMENTO', 'NOMBRE', 'CAPITAL', 'CAPITAL DISPONIBLE', 'SALARIO']
    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  const renderBodyPuestos = () => {
    return puestos.map(({ DEPARTAMENTO, PUESTO, CAPITAL, CAPDIS, SALARIO }) => {
      return (
        <tr key={PUESTO}>
          <td>{DEPARTAMENTO}</td>
          <td>{PUESTO}</td>
          <td>{CAPITAL}</td>
          <td>{CAPDIS}</td>
          <td>{SALARIO}</td>
        </tr>
      )
    })
  }

  const renderHeaderApEmp = () => {
    let headerElement = ['DEPARTAMENTO', 'DPI', 'NOMBRE', 'ESTADO', 'REVISOR']
    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  const renderBodyApEmp = () => {
    return apliemp.map(({ DEPARTAMENTO, DPI, NOMBRE, ESTADO, REVISOR }) => {
      return (
        <tr key={DPI}>
          <td>{DEPARTAMENTO}</td>
          <td>{DPI}</td>
          <td>{NOMBRE}</td>
          <td>{ESTADO}</td>
          <td>{REVISOR}</td>
        </tr>
      )
    })
  }

  const renderHeaderCoordRev = () => {
    let headerElement = ['DEPARTAMENTO', 'NOMBRE', 'TIPO', 'ESTADO', 'FECHA INICIO']
    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  const renderBodyCoordRev = () => {
    return coordrev.map(({ DEPARTAMENTO, NOMBRE, TIPO, ESTADO, FECHAINICIO }) => {
      return (
        <tr key={NOMBRE}>
          <td>{DEPARTAMENTO}</td>
          <td>{NOMBRE}</td>
          <td>{TIPO}</td>
          <td>{ESTADO}</td>
          <td>{FECHAINICIO}</td>
        </tr>
      )
    })
  }

  const filtrar = () => {
    if (departamento != "") {
      var nuevosDep=[]
      for(let i=0;i<puestos.length;i++){
        if(puestos[i].DEPARTAMENTO===departamento){
            nuevosDep.push(puestos[i])
        }
      }
      setPuestos(nuevosDep)
      setPuestos(nuevosDep)

      var del = apliemp
      del = apliemp.filter(apliempp => apliempp.DEPARTAMENTO == departamento)
      setApliEmp(del)

      del = coordrev
      del = coordrev.filter(coordrevv => coordrevv.DEPARTAMENTO == departamento)
      setCoordRev(del)
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
          <StyledLink to={"/reportes/organigrama"}>Reporte 1</StyledLink>
          <StyledLink to={"/reportes/planilla"}>Reporte 2</StyledLink>
          <StyledLink to={"/reportes/top5contratadas"}>Reporte 3</StyledLink>
          <StyledLink to={"/reportes/top5invrev"}>Reporte 4</StyledLink>
          <StyledLink to={"/reportes/top5docsrechap"}>Reporte 5</StyledLink>
          <StyledLink to={"/reportes/top5usocapdep"}>Reporte 6</StyledLink>
        </Container>
      </div>
      <br />
      <h1 style={{ textAlign: "center", color: "white" }}>Organigrama</h1>
      <br />
      <div style={{ textAlign: "right", marginLeft: "55%", marginRight: "2%" }}>
        <Row>
          <Col>
            <Dropdown>
              <Dropdown.Toggle id="size-dropdown" variant="info">
                Departamento
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {departamentos.map(dep => (
                  <Dropdown.Item onSelect={(e) => setDep(dep)} onChange={(e) => setDep(dep)}>{dep}</Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <FormGroup controlId="departamento" >
              <FormControl
                type="text"
                readOnly="true"
                value={departamento}
                onChange={(e) => setDep(e.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
              <Button style={{ marginBottom: "4%" }} class="btn btn-success" onClick={filtrar}> 
                VerDepartamento
              </Button>
          </Col>
          <Col>
            <Button onClick={quitarFiltros} variant="info">
              Todos los departamentos
            </Button>
          </Col>
        </Row>
      </div>
      <div className="row">
        <div className="col-md-12">
          <form style={{
            margin: "auto",
            backgroundColor: "#4884af",
            marginTop: "2%",
            width: "80%",
            padding: "2%",
            borderRadius: "2%",
            color: "white"
          }}>
            <h1 style={{ textAlign: "center" }}>Departamentos y Puestos</h1>
            <br />
            <table class="table table-sm table-hover" >
              <thead class="tblsimbolos">
                <tr>{renderHeaderPuestos()}</tr>
              </thead>
              <tbody class="tblsimbolos">
                {renderBodyPuestos()}
              </tbody>
            </table>
          </form>
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-md-12">
          <form style={{
            margin: "auto",
            backgroundColor: "#4884af",
            marginTop: "2%",
            width: "80%",
            padding: "2%",
            borderRadius: "2%",
            color: "white"
          }}>
            <h1 style={{ textAlign: "center" }}>Aplicantes y Empleados</h1>
            <br />
            <table class="table table-sm table-hover" >
              <thead class="tblsimbolos">
                <tr>{renderHeaderApEmp()}</tr>
              </thead>
              <tbody class="tblsimbolos">
                {renderBodyApEmp()}
              </tbody>
            </table>
          </form>
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-md-12">
          <form style={{
            margin: "auto",
            backgroundColor: "#4884af",
            marginTop: "2%",
            width: "80%",
            padding: "2%",
            borderRadius: "2%",
            color: "white"
          }}>
            <h1 style={{ textAlign: "center" }}>Coordinadores y Revisores</h1>
            <br />
            <table class="table table-sm table-hover" >
              <thead class="tblsimbolos">
                <tr>{renderHeaderCoordRev()}</tr>
              </thead>
              <tbody class="tblsimbolos">
                {renderBodyCoordRev()}
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


export default Organigrama