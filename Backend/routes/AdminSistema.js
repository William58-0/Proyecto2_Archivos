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
  const convert = require('xml-js');
  const fs = require('fs');

  // read file 
  //const xmlFile = fs.readFileSync('entrada.xml', 'utf8');
  const xmlFile = req.body.texto

  const xml2js = require('xml2js');

  var jsonData = undefined
  xml2js.parseString(xmlFile, (err, result) => {
    if (err) {
      throw err;
    }

    jsonData = JSON.stringify(result, null, 4);
    jsonData= JSON.parse(jsonData)

    //console.log(jsonData);

  });
  var arregloDep = jsonData.departamentos.departamento
  console.log("INSERTANDO DEPARTAMENTOS")
    for (let contDep = 0; contDep < arregloDep.length; contDep++) { // ------------------------------------------ CICLO DEPARTAMENTOS
      var nombreDep = arregloDep[contDep].nombre[0]
      var capDep = arregloDep[contDep].capital_total[0]

      let responseDep = await service.connect(
        `BEGIN INSERT INTO DEPARTAMENTO VALUES('${nombreDep}','${capDep}'); COMMIT; END;`
      );

      var arregloPuestos =arregloDep[contDep].puestos[0].puesto
      console.log("INSERTANDO PUESTOS")
      for(let contPuesto=0; contPuesto<arregloPuestos.length; contPuesto++){ // ------------------------------------------ CICLO PUESTOS

        var nombrePuesto=arregloPuestos[contPuesto].nombre[0]
        var salPuesto=arregloPuestos[contPuesto].salario[0]

        // INSERT INTO PUESTO VALUES('unopuesto', 2000.50, 3, 28, 'uno');
        let responsePuesto = await service.connect(
          `BEGIN INSERT INTO PUESTO VALUES('${nombrePuesto}','${salPuesto}',0,0,'${nombreDep}'); COMMIT; END;`
        );

        var arregloCat=arregloPuestos[contPuesto].categorias[0].categoria
        console.log("INSERTANDO CATEGORIAS")
        for(let contCat=0; contCat<arregloCat.length; contCat++){ // ------------------------------------------ CICLO CATEGORIAS
           var nombreCat=arregloCat[contCat].nombre[0]

           // INSERT INTO CATEGORIA VALUES('unocategoria','unopuesto', 'uno' );
           let responseCategoria = await service.connect(
             `BEGIN INSERT INTO CATEGORIA VALUES('${nombreCat}','${nombrePuesto}','${nombreDep}'); COMMIT; END;`
           );

        }

        var arregloReq=arregloPuestos[contPuesto].requisitos[0].requisito
        console.log("INSERTANDO REQUISITOS")
        for(let contReq=0; contReq<arregloReq.length; contReq++){ // ------------------------------------------ CICLO REQUISITOS
           var nombreReq=arregloReq[contReq].nombre[0]
           var tamanioReq=arregloReq[contReq].tamaño[0]
           var obligReq=arregloReq[contReq].obligatorio[0]

           var arregloFormat = arregloReq[contReq].formatos[0].formato
           console.log("INSERTANDO FORMATOS")
           for(let contFormat=0; contFormat<arregloFormat.length; contFormat++){ // ------------------------------------------ CICLO FORMATOS
            var nombreFormat=arregloFormat[contFormat].nombre[0]

            // INSERT INTO REQUISITO VALUES('dosrequisito','unopuesto','uno', 'pdf', 20, 1 );
            let responseCategoria = await service.connect(
              `BEGIN INSERT INTO REQUISITO VALUES('${nombreReq}','${nombrePuesto}','${nombreDep}','${nombreFormat}','${tamanioReq}','${obligReq}'); COMMIT; END;`
            );

           }

        }

      }

    }

});


module.exports = router;