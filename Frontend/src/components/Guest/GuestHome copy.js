import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FormControl } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
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
//const colors = ["red", "green", "blue", "orange"];



// Because this is an inframe, so the SSR mode doesn't not do well here.
// It will work on real devices.
const Simple = ({ deviceType }) => {
  const [calificacion, setCalificacion] = useState("");
  const [colors, setColors] = useState(["red", "green", "blue", "orange"]);

  const probar = () => {
    setColors(["black", "blue", "yellow", "red"])
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
        <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Plaza" name="user" />

        <button class="btn btn-success" style={{ marginLeft: "2%" }}>
          <i>Buscar</i>
        </button>
        <Button class="btn btn-success" style={{ marginLeft: "2%" }} onClick={probar}>
          <i>Probar</i>
        </Button>
      </div>
      <div style={{ color: "white", marginLeft: "5%" }}>
        Filtros:
        <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Salario" name="user" />
        <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Categoria" name="user" />
        <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Departamento" name="user" />
        <input style={{ marginLeft: "2%", marginBottom: "2%" }} type="text" placeholder="Clasificacion" name="user" />

        <button class="btn btn-success" style={{ marginLeft: "2%" }}>
          <i>Filtrar</i>
        </button>
        <button class="btn btn-info" style={{ marginLeft: "2%" }}>
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
          {colors.map(color => {
            return (
              <div class="card text-white" style={{ background: color, width: "80%", float: "left" }}>
                <div class="card-header bg-dark d-flex justify-content-between align-items-center">
                  Plaza
                </div>
                <div class="card-body d-flex justify-content-between align-items-center">
                  hello <br />
                  hello <br />
                  hello <br />
                  hello <br />
                  hello <br />
                </div>

                <div class="card-header d-flex justify-content-between align-items-center">
                  <Link to="/guest/form">
                    <button class="btn btn-success" onClick={() => { alert(color) }}>
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

export default Simple;


