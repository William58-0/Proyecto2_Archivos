var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

//const service = require("./connection.js");
const service = require("./connection.js");
const cors = require("cors");

router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.post("/login", async function (req, res, next) {
  const { usuario, password } = req.body;

  let response = await service.connect(
    `SELECT * from USUARIO WHERE usuario = '${usuario}' AND password_usuario='${password}'`
  );

  if (response.status == 400) {
    res.status(400).json({ message: response.message });
  } else {
    if (response.data.length == 0) {
      res.status(400).json({ message: "Credenciales incorrectas" });
    } else {
      res
        .status(200)
        .json({ message: "Credenciales correctas", data: response.data[0] });
    }
  }
});

/*
router.post("/crear_usuario", async function (req, res, next) {
  const { usuario, nombre, apellido, password, edad, correo } = req.body;

  let response = await service.connect(
    `BEGIN INSERT INTO USUARIO VALUES('${usuario}','${nombre}','${apellido}','${password}','${parseInt(edad)}','${correo}'); COMMIT; END;`
  );
  
  if (response.status == 400) {
    res.status(400).json({ message: response.message });
  } else {
      res
        .status(200)
        .json({ message: "Usuario creado correctamente"});
  }
});
*/

router.post("/crear_usuario", async function (req, res, next) {
  const { usuario, nombre, apellido, password, edad, correo } = req.body;
  console.log("logra estooo")
  let response = await service.connect(
    'BEGIN INSERT INTO USUARIO VALUES(\'789789\',\'William\',\'Alarcon\',\'1234\',19,\'william@gmail.com\'); COMMIT;  END;'
  );

  if (response.status == 400) {
    console.log("esto paso")
    console.log(response)
    res.status(400).json({ message: response.message });

  } else {
    console.log("esto otro paso")
    res
      .status(200)
      .json({ message: "Usuario creado correctamente" });
  }
});

router.post("/cargamasiva", async function (req, res, next) {
  console.log("llego aquiii")
  console.log(req.body)

  const convert = require('xml-js');
  const fs = require('fs');

  // read file 
  const xmlFile = fs.readFileSync('entrada.xml', 'utf8');
  //const xmlFile = req.body.texto

  // parse xml file as a json object 
  const jsonData = JSON.parse(convert.xml2json(xmlFile, { compact: true, spaces: 2 }));
  console.log(jsonData)
  console.log("otro")
  console.log(jsonData.departamentos)
  console.log("otroo")
  // -------------------------------------------------------------------------------------------------------------- RECORRER XML(JSON)
  // --------------------------------------------------------------------------------------- VERIFICAR SI SON VARIOS DEPARTAMENTOS 
  var muchosdep = false
  try {
    if (jsonData.departamentos.departamento[0].puestos == undefined) {
      muchosdep = false
    } else {
      muchosdep = true
    }
  } catch {
    muchosdep = false
  }

  // --------------------------------------------------------------------------------------- MUCHOS_DEP
  // PARA INSERTAR LOS DEPARTAMENTOS
  if (muchosdep) {
    console.log("MUCHOS_DEP")
    var arregloDep = jsonData.departamentos.departamento
    for (let contDep = 0; contDep < arregloDep.length; contDep++) {
      var nombreDep = arregloDep[contDep].nombre._text;
      var capDep = arregloDep[contDep].capital_total._text;

      //console.log(nombreDep);
      //console.log(capDep);

      // Se inserta cada departamento y su capital

      let responseDep = await service.connect(
        `BEGIN INSERT INTO DEPARTAMENTO VALUES('${nombreDep}','${capDep}'); COMMIT; END;`
      );
      // --------------------------------------------------------------------------------------- VERIFICAR SI SON VARIOS PUESTOS 
      var muchospuestos = false
      try {
        if (arregloDep[contDep].puestos.puesto[0].nombre == undefined) {
          muchospuestos = false
        } else {
          muchospuestos = true
        }
      } catch {
        muchospuestos = false
      }

      // --------------------------------------------------------------------------------------- MUCHOS_DEP - MUCHOS_PUESTOS
      if (muchospuestos) {
        console.log("MUCHOS_DEP - MUCHOS_PUESTOS")
        var arregloPuestos = arregloDep[contDep].puestos.puesto
        for (let contPuesto = 0; contPuesto < arregloPuestos.length; contPuesto++) {
          var nombrePuesto = arregloPuestos[contPuesto].nombre._text;
          var salPuesto = arregloPuestos[contPuesto].salario._text;

          //console.log(nombrePuesto)
          //console.log(salPuesto)

          // INSERT INTO PUESTO VALUES('unopuesto', 2000.50, 3, 28, 'uno');
          let responsePuesto = await service.connect(
            `BEGIN INSERT INTO PUESTO VALUES('${nombrePuesto}','${salPuesto}',0,0,'${nombreDep}'); COMMIT; END;`
          );

          // --------------------------------------------------------------------------------------- VERIFICAR SI SON VARIAS CATEGORIAS 
          var muchascategorias = false
          try {
            if (arregloPuestos[contPuesto].categorias.categoria[0].nombre == undefined) {
              muchascategorias = false
            } else {
              muchascategorias = true
            }
          } catch {
            muchascategorias = false
          }
          //console.log(muchascategorias)
          // --------------------------------------------------------------------------------------- MUCHOS_DEP - MUCHOS_PUESTOS - MUCHAS_CATEGORIAS
          if (muchascategorias) {
            console.log("MUCHOS_DEP - MUCHOS_PUESTOS - MUCHAS_CATEGORIAS")
            var arregloCat = arregloPuestos[contPuesto].categorias.categoria
            for (let contCategoria = 0; contCategoria < arregloCat.length; contCategoria++) {
              var nombreCat = arregloCat[contCategoria].nombre._text;

              //console.log(nombreCat)
              // INSERT INTO CATEGORIA VALUES('unocategoria','unopuesto', 'uno' );
              let responseCategoria = await service.connect(
                `BEGIN INSERT INTO CATEGORIA VALUES('${nombreCat}','${nombrePuesto}','${nombreDep}'); COMMIT; END;`
              );

            }
          }
          // --------------------------------------------------------------------------------------- MUCHOS_DEP - MUCHOS_PUESTOS - UNICA_CATEGORIA
          else {
            console.log("MUCHOS_DEP - MUCHOS_PUESTOS - UNICA_CATEGORIA")
            var catUnica = arregloPuestos[contPuesto].categorias.categoria
            var nombreCat = catUnica.nombre._text;

            //console.log(nombreCat)
            // INSERT INTO CATEGORIA VALUES('unocategoria','unopuesto', 'uno' );
            let responseCategoria = await service.connect(
              `BEGIN INSERT INTO CATEGORIA VALUES('${nombreCat}','${nombrePuesto}','${nombreDep}'); COMMIT; END;`
            );
          }

          // --------------------------------------------------------------------------------------- VERIFICAR SI SON VARIOS REQUISITOS 
          var muchosrequisitos = false
          try {
            if (arregloPuestos[contPuesto].requisitos.requisito[0].nombre == undefined) {
              muchosrequisitos = false
            } else {
              muchosrequisitos = true
            }
          } catch {
            muchosrequisitos = false
          }
          //console.log(muchosrequisitos)
          // --------------------------------------------------------------------------------------- MUCHOS_DEP - MUCHOS_PUESTOS - MUCHOS_REQUISITOS
          if (muchosrequisitos) {
            console.log("MUCHOS_DEP - MUCHOS_PUESTOS - MUCHOS_REQUISITOS")
            var arregloReq = arregloPuestos[contPuesto].requisitos.requisito
            for (let contReq = 0; contReq < arregloReq.length; contReq++) {
              var nombreReq = arregloReq[contReq].nombre._text;
              var tamanioReq = arregloReq[contReq].tamaño._text;
              var obligReq = arregloReq[contReq].obligatorio._text;

              //console.log(nombreReq)
              //console.log(tamanioReq)
              //console.log(obligReq)


              // --------------------------------------------------------------------------------------- VERIFICAR SI SON VARIOS FORMATOS
              var muchosformatos = false
              try {
                if (arregloReq[contReq].formatos.formato[0].nombre == undefined) {
                  muchosformatos = false
                } else {
                  muchosformatos = true
                }
              } catch {
                muchosformatos = false
              }
              // --------------------------------------------------------------------------------------- MUCHOS_DEP - MUCHOS_PUESTOS - MUCHOS_REQUISITOS - MUCHOS_FORMATOS
              if (muchosformatos) {
                console.log("MUCHOS_DEP - MUCHOS_PUESTOS - MUCHOS_REQUISITOS - MUCHOS_FORMATOS")
                var arregloFromat = arregloReq[contReq].formatos.formato
                for (let contFormat = 0; contFormat < arregloFromat.length; contFormat++) {
                  var nombreFormat = arregloFromat[contFormat].nombre._text;

                  //console.log(nombreFormat)

                  // INSERT INTO REQUISITO VALUES('dosrequisito','unopuesto','uno', 'pdf', 20, 1 );
                  let responseReq = await service.connect(
                    `BEGIN INSERT INTO REQUISITO VALUES('${nombreReq}','${nombrePuesto}','${nombreDep}','${nombreFormat}','${tamanioReq}','${obligReq}'); COMMIT; END;`
                  );
                  //console.log(response)
                }
              }
              // --------------------------------------------------------------------------------------- MUCHOS_DEP - MUCHOS_PUESTOS - MUCHOS_REQUISITOS - UNICO_FORMATO
              else {
                console.log("MUCHOS_DEP - MUCHOS_PUESTOS - MUCHOS_REQUISITOS - UNICO_FORMATO")
                var formatUnico = arregloReq[contReq].formatos.formato
                var nombreFormat = formatUnico.nombre._text;

                //console.log(nombreFormat)

                // INSERT INTO REQUISITO VALUES('dosrequisito','unopuesto','uno', 'pdf', 20, 1 );
                let responseReq = await service.connect(
                  `BEGIN INSERT INTO REQUISITO VALUES('${nombreReq}','${nombrePuesto}','${nombreDep}','${nombreFormat}','${tamanioReq}','${obligReq}'); COMMIT; END;`
                );
                //console.log(response)
              }

            }
          }
          // --------------------------------------------------------------------------------------- MUCHOS_DEP - MUCHOS_PUESTOS - UNICO_REQUISITO
          else {
            console.log("MUCHOS_DEP - MUCHOS_PUESTOS - UNICO_REQUISITO")
            var reqUnico = arregloPuestos[contPuesto].requisitos.requisito
            //console.log(reqUnico)
            var nombreReq = reqUnico.nombre._text;
            var tamanioReq = reqUnico.tamaño._text;
            var obligReq = reqUnico.obligatorio._text;

            //console.log(nombreReq)
            //console.log(tamanioReq)
            //console.log(obligReq)

            // --------------------------------------------------------------------------------------- VERIFICAR SI SON VARIOS FORMATOS
            var muchosformatos = false
            try {
              if (reqUnico.formatos.formato[0].nombre == undefined) {
                muchosformatos = false
              } else {
                muchosformatos = true
              }
            } catch {
              muchosformatos = false
            }
            // --------------------------------------------------------------------------------------- MUCHOS_DEP - MUCHOS_PUESTOS - UNICO_REQUISITO - MUCHOS_FORMATOS
            if (muchosformatos) {
              console.log("MUCHOS_DEP - MUCHOS_PUESTOS - UNICO_REQUISITO - MUCHOS_FORMATOS")
              var arregloFromat = reqUnico.formatos.formato
              for (let contFormat = 0; contFormat < arregloFromat.length; contFormat++) {
                var nombreFormat = arregloFromat[contFormat].nombre._text;

                //console.log(nombreFormat)

                // INSERT INTO REQUISITO VALUES('dosrequisito','unopuesto','uno', 'pdf', 20, 1 );
                let responseReq = await service.connect(
                  `BEGIN INSERT INTO REQUISITO VALUES('${nombreReq}','${nombrePuesto}','${nombreDep}','${nombreFormat}','${tamanioReq}','${obligReq}'); COMMIT; END;`
                );
                //console.log(response)
              }
            }
            // --------------------------------------------------------------------------------------- MUCHOS_DEP - MUCHOS_PUESTOS - UNICO_REQUISITO - UNICO_FORMATO
            else {
              console.log("MUCHOS_DEP - MUCHOS_PUESTOS - UNICO_REQUISITO - UNICO_FORMATO")
              var formatUnico = reqUnico.formatos.formato
              var nombreFormat = formatUnico.nombre._text;

              //console.log(nombreFormat)

              // INSERT INTO REQUISITO VALUES('dosrequisito','unopuesto','uno', 'pdf', 20, 1 );
              let responseReq = await service.connect(
                `BEGIN INSERT INTO REQUISITO VALUES('${nombreReq}','${nombrePuesto}','${nombreDep}','${nombreFormat}','${tamanioReq}','${obligReq}'); COMMIT; END;`
              );
              //console.log(response)
            }

          }

        }
      }
      // --------------------------------------------------------------------------------------- MUCHOS_DEP - UNICO_PUESTO
      else {
        console.log("MUCHOS_DEP - UNICO_PUESTO")
        var puestoUnico = arregloDep[contDep].puestos.puesto
        var nombrePuesto = puestoUnico.nombre._text;
        var salPuesto = puestoUnico.salario._text;

        //console.log(nombrePuesto)
        //console.log(salPuesto)

        // INSERT INTO PUESTO VALUES('unopuesto', 2000.50, 3, 28, 'uno');
        let responsePuesto = await service.connect(
          `BEGIN INSERT INTO PUESTO VALUES('${nombrePuesto}','${salPuesto}',0,0,'${nombreDep}'); COMMIT; END;`
        );

        // --------------------------------------------------------------------------------------- VERIFICAR SI SON VARIAS CATEGORIAS 
        var muchascategorias = false
        try {
          if (puestoUnico.categorias.categoria[0].nombre == undefined) {
            muchascategorias = false
          } else {
            muchascategorias = true
          }
        } catch {
          muchascategorias = false
        }
        //console.log(muchascategorias)
        // --------------------------------------------------------------------------------------- MUCHOS_DEP - UNICO_PUESTO - MUCHAS_CATEGORIAS
        if (muchascategorias) {
          console.log("MUCHOS_DEP - UNICO_PUESTO - MUCHAS_CATEGORIAS")
          var arregloCat = puestoUnico.categorias.categoria
          for (let contCategoria = 0; contCategoria < arregloCat.length; contCategoria++) {
            var nombreCat = arregloCat[contCategoria].nombre._text;

            //console.log(nombreCat)
            // INSERT INTO CATEGORIA VALUES('unocategoria','unopuesto', 'uno' );
            let responseCategoria = await service.connect(
              `BEGIN INSERT INTO CATEGORIA VALUES('${nombreCat}','${nombrePuesto}','${nombreDep}'); COMMIT; END;`
            );

          }
        }
        // --------------------------------------------------------------------------------------- MUCHOS_DEP - UNICO_PUESTO - UNICA_CATEGORIA
        else {
          console.log("MUCHOS_DEP - UNICO_PUESTO - UNICA_CATEGORIA")
          var catUnica = puestoUnico.categorias.categoria
          var nombreCat = catUnica.nombre._text;

          //console.log(nombreCat)
          // INSERT INTO CATEGORIA VALUES('unocategoria','unopuesto', 'uno' );
          let responseCategoria = await service.connect(
            `BEGIN INSERT INTO CATEGORIA VALUES('${nombreCat}','${nombrePuesto}','${nombreDep}'); COMMIT; END;`
          );
        }
        // --------------------------------------------------------------------------------------- VERIFICAR SI SON VARIOS REQUISITOS 
        var muchosrequisitos = false
        try {
          if (puestoUnico.requisitos.requisito[0].nombre == undefined) {
            muchosrequisitos = false
          } else {
            muchosrequisitos = true
          }
        } catch {
          muchosrequisitos = false
        }
        //console.log(muchosrequisitos)
        // --------------------------------------------------------------------------------------- MUCHOS_DEP - UNICO_PUESTO - MUCHOS_REQUISITOS
        if (muchosrequisitos) {
          console.log("MUCHOS_DEP - UNICO_PUESTO - MUCHOS_REQUISITOS")
          var arregloReq = puestoUnico.requisitos.requisito
          for (let contReq = 0; contReq < arregloReq.length; contReq++) {
            var nombreReq = arregloReq[contReq].nombre._text;
            var tamanioReq = arregloReq[contReq].tamaño._text;
            var obligReq = arregloReq[contReq].obligatorio._text;

            //console.log(nombreReq)
            //console.log(tamanioReq)
            //console.log(obligReq)


            // --------------------------------------------------------------------------------------- VERIFICAR SI SON VARIOS FORMATOS
            var muchosformatos = false
            try {
              if (arregloReq[contReq].formatos.formato[0].nombre == undefined) {
                muchosformatos = false
              } else {
                muchosformatos = true
              }
            } catch {
              muchosformatos = false
            }
            // --------------------------------------------------------------------------------------- MUCHOS_DEP - UNICO_PUESTO - MUCHOS_REQUISITOS - MUCHOS_FORMATOS
            if (muchosformatos) {
              console.log("MUCHOS_DEP - UNICO_PUESTO - MUCHOS_REQUISITOS - MUCHOS_FORMATOS")
              var arregloFromat = arregloReq[contReq].formatos.formato
              for (let contFormat = 0; contFormat < arregloFromat.length; contFormat++) {
                var nombreFormat = arregloFromat[contFormat].nombre._text;

                //console.log(nombreFormat)

                // INSERT INTO REQUISITO VALUES('dosrequisito','unopuesto','uno', 'pdf', 20, 1 );
                let responseReq = await service.connect(
                  `BEGIN INSERT INTO REQUISITO VALUES('${nombreReq}','${nombrePuesto}','${nombreDep}','${nombreFormat}','${tamanioReq}','${obligReq}'); COMMIT; END;`
                );
                //console.log(response)
              }
            }
            // --------------------------------------------------------------------------------------- MUCHOS_DEP - UNICO_PUESTO - MUCHOS_REQUISITOS - UNICO_FORMATO
            else {
              console.log("MUCHOS_DEP - UNICO_PUESTO - MUCHOS_REQUISITOS - UNICO_FORMATO")
              var formatUnico = arregloReq[contReq].formatos.formato
              var nombreFormat = formatUnico.nombre._text;

              //console.log(nombreFormat)

              // INSERT INTO REQUISITO VALUES('dosrequisito','unopuesto','uno', 'pdf', 20, 1 );
              let responseReq = await service.connect(
                `BEGIN INSERT INTO REQUISITO VALUES('${nombreReq}','${nombrePuesto}','${nombreDep}','${nombreFormat}','${tamanioReq}','${obligReq}'); COMMIT; END;`
              );
              //console.log(response)
            }

          }
        }
        // --------------------------------------------------------------------------------------- MUCHOS_DEP - UNICO_PUESTO - UNICO_REQUISITO
        else {
          console.log("MUCHOS_DEP - UNICO_PUESTO - UNICO_REQUISITO")
          var reqUnico = puestoUnico.requisitos.requisito

          var nombreReq = reqUnico.nombre._text;
          var tamanioReq = reqUnico.tamaño._text;
          var obligReq = reqUnico.obligatorio._text;

          //console.log(nombreReq)
          //console.log(tamanioReq)
          //console.log(obligReq)

          // --------------------------------------------------------------------------------------- VERIFICAR SI SON VARIOS FORMATOS
          var muchosformatos = false
          try {
            if (reqUnico.formatos.formato[0].nombre == undefined) {
              muchosformatos = false
            } else {
              muchosformatos = true
            }
          } catch {
            muchosformatos = false
          }
          // --------------------------------------------------------------------------------------- MUCHOS_DEP - UNICO_PUESTO - UNICO_REQUISITO - MUCHOS_FORMATOS
          if (muchosformatos) {
            console.log("MUCHOS_DEP - UNICO_PUESTO - UNICO_REQUISITO - MUCHOS_FORMATOS")
            var arregloFromat = reqUnico.formatos.formato
            for (let contFormat = 0; contFormat < arregloFromat.length; contFormat++) {
              var nombreFormat = arregloFromat[contFormat].nombre._text;

              //console.log(nombreFormat)

              // INSERT INTO REQUISITO VALUES('dosrequisito','unopuesto','uno', 'pdf', 20, 1 );
              let responseReq = await service.connect(
                `BEGIN INSERT INTO REQUISITO VALUES('${nombreReq}','${nombrePuesto}','${nombreDep}','${nombreFormat}','${tamanioReq}','${obligReq}'); COMMIT; END;`
              );
              //console.log(response)
            }
          }
          // --------------------------------------------------------------------------------------- MUCHOS_DEP - UNICO_PUESTO - UNICO_REQUISITO - UNICO_FORMATO
          else {
            console.log("MUCHOS_DEP - UNICO_PUESTO - UNICO_REQUISITO - UNICO_FORMATO")
            var formatUnico = reqUnico.formatos.formato
            var nombreFormat = formatUnico.nombre._text;

            //console.log(nombreFormat)

            // INSERT INTO REQUISITO VALUES('dosrequisito','unopuesto','uno', 'pdf', 20, 1 );
            let responseReq = await service.connect(
              `BEGIN INSERT INTO REQUISITO VALUES('${nombreReq}','${nombrePuesto}','${nombreDep}','${nombreFormat}','${tamanioReq}','${obligReq}'); COMMIT; END;`
            );
            //console.log(response)
          }
        }
      }
      console.log("")
    }
  }
  // --------------------------------------------------------------------------------------- UNICO_DEP
  else {

  }




});


router.put("/modificar_usuario", async function (req, res, next) {
  const { usuario, nombre, apellido, edad, correo } = req.body;

  let response = await service.connect(
    `BEGIN UPDATE USUARIO SET nombre_usuario='${nombre}', apellido_usuario='${apellido}', edad_usuario=${parseInt(edad)}, correo_usuario='${correo}' WHERE usuario='${usuario}'; COMMIT; END;`
  );

  if (response.status == 400) {
    res.status(400).json({ message: response.message });
  } else {
    res
      .status(200)
      .json({ message: "Usuario creado correctamente" });
  }
});

router.get("/consulta_usuario", async function (req, res, next) {

  let response = await service.connect(
    `SELECT * from USUARIO`
  );
  console.log(response);
  if (response.status == 400) {
    res.status(400).json({ message: response.message });
  } else {
    res
      .status(200)
      .json({ message: "Credenciales correctas", data: response.data });
  }
});


module.exports = router;