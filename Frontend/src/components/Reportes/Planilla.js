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

var departamentos = []

function Planilla() {
  const [apliemp, setApliEmp] = useState([])
  const [departamento, setDep] = useState("")

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

    const respApliEmp = await Rep1ApEmp()
    console.log(respApliEmp)

    if (departamento == "") {
      var del = respApliEmp.data.filter(depa => depa.ESTADO == 'contratado')
      setApliEmp(del)
      //setApliEmp(respApliEmp.data)
    } else {
      var del = respApliEmp.data
      del = respApliEmp.data.filter(depa => depa.DEPARTAMENTO == departamento)

      del = del.filter(depa => depa.ESTADO == 'contratado')
      setApliEmp(del)
    }

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

  const filtrar = () => {
    if (departamento != "") {

      var del = apliemp
      del = apliemp.filter(apliempp => apliempp.DEPARTAMENTO == departamento)
      setApliEmp(del)
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
      <h1 style={{ textAlign: "center", color: "white" }}>Planilla</h1>
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

      <br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br />
      <br /><br /><br /><br /><br />
    </>
  )
}


export default Planilla