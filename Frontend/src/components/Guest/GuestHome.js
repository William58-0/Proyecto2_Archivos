import React, { useState, useEffect } from 'react'
import { getPuestos } from '../../utils/api';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from 'react-router-dom';
// ejemplo de: https://codesandbox.io/s/pg4fj?file=/src/simple.js
const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    paritialVisibilityGutter: 60
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    paritialVisibilityGutter: 40
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 40
  }
};

var original=[]

const GuestHome = ({ deviceType }) => {
  const [calificacion, setCalificacion] = useState("");
  const [puestos, setPuestos] = useState([]);
  const [filName, setFilName] = useState("");
  const [filSal, setFilSal] = useState("");
  const [filCat, setFilCat] = useState("");
  const [filDep, setFilDep] = useState("");
  const [filCal, setFilCal] = useState("");
  
  const filtrar = () => {
    if(original.length==0){
      original=puestos
    }else{
      setPuestos(original)
    }
    var del = puestos
        if (filSal != "") {
            del = puestos.filter(puesto => puesto.SALARIO == filSal)
            setPuestos(del)
        } if (filCat != "") {
            del = puestos.filter(puesto => puesto.CATEGORIA == filCat)
            setPuestos(del)
        } if (filDep != "") {
            del = puestos.filter(puesto => puesto.DEPARTAMENTO == filDep)
            setPuestos(del)
        } if (filCal != "") {
            del = puestos.filter(puesto => puesto.CALIFICACION == filCal)
            setPuestos(del)
        }
  }

  const buscar = () => {
    if(original.length==0){
      original=puestos
    }else{
      setPuestos(original)
    }
    var del = puestos
        if (filName != "") {
            del = puestos.filter(puesto => puesto.NOMBRE == filName)
            setPuestos(del)
        }
  }

  const quitarFiltros = () => {
    window.location.reload();
  }

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const response = await getPuestos()
    console.log(response)
    setPuestos(response.data)
  }

  return (
    <div >
      <br />
      <Link to="/">
        <button style={{ marginLeft: "5%" }} class="btn btn-success">
          Regresar
        </button>
      </Link>
      <br />
      <br />
      <div style={{ textAlign: "left", color: "white", marginLeft: "5%" }}>
        Buscar Plaza:
        <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text"
         placeholder="Plaza" value={filName} onChange={(e) => setFilName(e.target.value)} 
         />

        <button class="btn btn-success" style={{ marginLeft: "2%" }} onClick={buscar}>
          <i>Buscar</i>
        </button>
      </div>
      <div style={{ color: "white", marginLeft: "5%" }}>
        Filtros:
        <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text"
         placeholder="Salario" value={filSal} onChange={(e) => setFilSal(e.target.value)}  />
        <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" 
        placeholder="Categoria" value={filCat} onChange={(e) => setFilCat(e.target.value)} />
        <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text"
        placeholder="Departamento" value={filDep} onChange={(e) => setFilDep(e.target.value)} />
        <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text"
        placeholder="Calificacion" value={filCal} onChange={(e) => setFilCal(e.target.value)} />

        <button class="btn btn-success" style={{ marginLeft: "2%" }} onClick={filtrar}>
          <i>Filtrar</i>
        </button>
        <button class="btn btn-info" style={{ marginLeft: "2%" }} onClick={quitarFiltros}>
          <i>Quitar Filtros</i>
        </button>
      </div>
      <div style={{ textAlign: "center", width: "50%", margin: "auto" }}>

        <Carousel
          centerMode={true}
          deviceType={deviceType}
          itemClass="image-item"
          responsive={responsive}
          removeArrowOnDeviceType={["tablet", "mobile"]}
        >
          {puestos.map(puesto => {
            return (
              <div class="card text-white" style={{ background: "gray", width: "80%", float: "left" }}>
                <div class="card-header bg-dark d-flex justify-content-between align-items-center">
                  {puesto.NOMBRE}
                </div>
                <div class="card-body d-flex justify-content-between align-items-center" style={{textAlign:"left"}}>
                  Departamento: {puesto.DEPARTAMENTO} <br />
                  Salario: {puesto.SALARIO} <br />
                  Calificaciones: {puesto.CALIFICACIONES} <br />
                  Puntaje Promedio: {puesto.CALIFPROMEDIO} <br />
                </div>

                <div class="card-header d-flex justify-content-between align-items-center">
                  <Link to={"/guest/form/"+puesto.NOMBRE+"/"+puesto.DEPARTAMENTO}>
                    <button class="btn btn-success" >
                      Seleccionar
                    </button>
                  </Link>

                  <button class="btn btn-success" onClick={() => { alert("calificacion agregada") }}>
                    Calificar
                  </button>
                </div>

              </div>
            );
          })
          }
        </Carousel>
        <br />
        <div style={{ textAlign: "left", color: "white" }}>
          Calificacion:
          <input
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            type="number"
            max="5"
            min="1"
            width="10%"
            style={{ width: "10%", marginLeft: "2%" }}
          />
        </div>

      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
};

export default GuestHome;


