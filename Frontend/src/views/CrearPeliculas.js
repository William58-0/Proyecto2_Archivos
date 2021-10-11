import React, { useState } from "react";

import { URL } from "../variables/rutas";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Button,
  CardFooter,
  FormGroup,
  Row,
  Col,
} from "reactstrap";
import { FormControl, FormLabel } from "react-bootstrap";

import "toastr/build/toastr.min.css";
import toastr from "toastr";
import "./CrearPeliculas.css";

export default function CrearPeliculas() {
  const [titulo, setTitulo] = useState("");
  const [lanzamiento, setLanzamiento] = useState("");
  const [rating, setRating] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit=(event)=> {
    event.preventDefault();

    fetch(`${URL.crear_pelicula}`, {
      method: "POST",
      body: JSON.stringify({
        titulo_pelicula: titulo,
        year_pelicula: lanzamiento,
        rating_pelicula: rating,
        descripcion_pelicula: descripcion,
      }),
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    })
      .then((res) => res)
      .then(async function (response) {
        if (response.status == 200) {
          toastr.options = {
            positionClass: "toast-top-full-width",
            hideDuration: 300,
            timeOut: 60000,
          };
          toastr.clear();
          setTimeout(
            () => toastr.success(`Película creada correctamente`),
            300
          );
          setTitulo("");
          setRating("");
          setLanzamiento("");
          setDescripcion("");
        } else {
          toastr.options = {
            positionClass: "toast-top-full-width",
            hideDuration: 300,
            timeOut: 60000,
          };
          toastr.clear();
          setTimeout(() => toastr.warning(`Error al crear la película`), 300);
        }
      });
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h2">Crear Pelicula</CardTitle>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <FormLabel>Titulo Pelicula</FormLabel>
                  <FormControl
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    type="text"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Año Lanzamiento</FormLabel>
                  <FormControl
                    value={lanzamiento}
                    onChange={(e) => setLanzamiento(e.target.value)}
                    type="number"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Rating Pelicula</FormLabel>
                  <FormControl
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    type="number"
                  />
                </FormGroup>

                <FormGroup>
                  <FormLabel>Descripción Pelicula</FormLabel>
                  <FormControl
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    type="text"
                  />
                </FormGroup>
              </CardBody>
              <CardFooter>
                <Button
                  block
                  onClick={(e) => handleSubmit(e)}
                  id="login"
                  className="btn-fill"
                  color="warning"
                >
                  Crear Pelicula
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
