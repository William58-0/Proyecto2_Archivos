import React, { useState, useEffect } from 'react'
import { Rep6 } from '../../utils/api';
import { Link } from 'react-router-dom';
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

function Top5UsoCapDep() {
  const [departamentos, setDeps] = useState([])

  useEffect(() => {
    getData();
  }, [])

  const getData = async () => {

    const respDeps = await Rep6()
    console.log(respDeps)

    setDeps(respDeps.data)

  }

  const renderHeader = () => {
    let headerElement = ['NOMBRE', 'CAPITAL', 'CAPITAL DISPONIBLE', 'CAPITAL USADO', 'PUESTO CON MAYOR SALARIO']
    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  const renderBody = () => {
    return departamentos.map(({ NOMBRE, CAPITAL, CAPDIS, CNT, MEJORPUESTO }) => {
      return (
        <tr key={NOMBRE}>
          <td>{NOMBRE}</td>
          <td>{CAPITAL}</td>
          <td>{CAPDIS}</td>
          <td>{CNT}</td>
          <td>{MEJORPUESTO}</td>
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
          <StyledLink to={"/reportes/organigrama"}>Reporte 1</StyledLink>
          <StyledLink to={"/reportes/planilla"}>Reporte 2</StyledLink>
          <StyledLink to={"/reportes/top5contratadas"}>Reporte 3</StyledLink>
          <StyledLink to={"/reportes/top5invrev"}>Reporte 4</StyledLink>
          <StyledLink to={"/reportes/top5docsrechap"}>Reporte 5</StyledLink>
          <StyledLink to={"/reportes/top5usocapdep"}>Reporte 6</StyledLink>
        </Container>
      </div>
      <br />
      <h1 style={{ textAlign: "center", color: "white" }}>Top 5 Departamentos con Mayor uso de su Capital</h1>
      <br />
      <div style={{ textAlign: "right", marginLeft: "55%", marginRight: "2%" }}>
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


export default Top5UsoCapDep