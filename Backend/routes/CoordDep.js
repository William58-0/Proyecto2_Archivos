var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

//const service = require("./connection.js");
const service = require("./connection.js");
const cors = require("cors");

router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.get("/Login", async function (req, res, next) {
  let responseDep = await service.connect(
    `SELECT Nombre, Contrasenia FROM COORDINADOR_REVISOR`
  );
  console.log(req)
  if (responseDep.status == 400) {
    res.status(400).json({ message: responseDep.message });
  } else {
    res
      .status(200)
      .json(responseDep.data);
  }
});


router.post("/cargamasiva", async function (req, res, next) {
  const xmlFile = req.body.texto
  const xml2js = require('xml2js');
  var jsonData = undefined
  xml2js.parseString(xmlFile, (err, result) => {
    if (err) {
      throw err;
    }
    jsonData = JSON.stringify(result, null, 4);
    jsonData= JSON.parse(jsonData)
  });
  var arregloDep = jsonData.departamentos.departamento
  console.log("INSERTANDO DEPARTAMENTOS")
    for (let contDep = 0; contDep < arregloDep.length; contDep++) { // ------------------------------------------ CICLO DEPARTAMENTOS
      var nombreDep = arregloDep[contDep].nombre[0]
      var capDep = arregloDep[contDep].capital_total[0]
      let responseDep = await service.connect(
        `BEGIN INSERT INTO DEPARTAMENTO VALUES('${nombreDep}',${capDep}); COMMIT; END;`
      );
      var arregloPuestos =arregloDep[contDep].puestos[0].puesto
      console.log("INSERTANDO PUESTOS")
      for(let contPuesto=0; contPuesto<arregloPuestos.length; contPuesto++){ // ------------------------------------------ CICLO PUESTOS
        var nombrePuesto=arregloPuestos[contPuesto].nombre[0]
        var salPuesto=arregloPuestos[contPuesto].salario[0]
        // INSERT INTO PUESTO VALUES('unopuesto', 2000.50, 3, 28, 'uno');
        let responsePuesto = await service.connect(
          `BEGIN INSERT INTO PUESTO VALUES('${nombrePuesto}',${salPuesto},0,0,'${nombreDep}'); COMMIT; END;`
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
              `BEGIN INSERT INTO REQUISITO VALUES('${nombreReq}','${nombrePuesto}','${nombreDep}','${nombreFormat}',${tamanioReq},${obligReq}); COMMIT; END;`
            );
           }
        }
      }
    }
});

router.post("/registrarusuario", async function (req, res, next) {  
  const { nombre, contrasenia, tipo, departamento } = req.body;
  let now= new Date();
  const fechainicio=now.getDay()+"/"+now.getMonth()+"/"+now.getFullYear()

  // INSERT INTO COORDINADOR_REVISOR VALUES('coord1','1234', 'hoy', 'maniana', 'Coordinador', 'Activo', 'uno' );
  let response = await service.connect(
    `BEGIN INSERT INTO COORDINADOR_REVISOR VALUES('${nombre}','${contrasenia}','${fechainicio}','-','${tipo}','Activo','${departamento}'); COMMIT; END;`
  );
  
  if (response.status == 400) {
    res.status(400).json({ message: response.message });
  } else {
      res
        .status(200)
        .json({ message: "Usuario creado correctamente"});
  }
});

router.post("/editarusuario", async function (req, res, next) {  
  const { original, nombre, contrasenia, tipo, departamento } = req.body;

  // UPDATE COORDINADOR_REVISOR SET Nombre = 'william', Contrasenia='nueva', Tipo='Rev', Departamento='uno' WHERE Nombre = 'Anderson';
  let response = await service.connect(
    `UPDATE COORDINADOR_REVISOR SET Nombre='${nombre}', Contrasenia='${contrasenia}', Tipo='${tipo}', Departamento='${departamento}' WHERE Nombre='${original}'`
  );

  console.log(response)
  
  if (response.status == 400) {
    res.status(400).json({ message: response.message });
  } else {
      res
        .status(200)
        .json({ message: "Usuario actualizado correctamente"});
  }
  
});

router.post("/eliminarusuario", async function (req, res, next) {  
  const { nombre } = req.body;

  // UPDATE COORDINADOR_REVISOR SET Estado = 'Inactivo' WHERE Nombre = 'Anderson';
  let response = await service.connect(
    `UPDATE COORDINADOR_REVISOR SET Estado='Inactivo' WHERE Nombre='${nombre}'`
  );

  console.log(response)
  
  if (response.status == 400) {
    res.status(400).json({ message: response.message });
  } else {
      res
        .status(200)
        .json({ message: "Usuario eliminado correctamente"});
  }
  
});

// Obtiene los aplicantes de su departamento
router.post("/getAplicantesC", async function (req, res, next) {
  const {dept} =req.body
  let respGetApl = await service.connect(
    `SELECT * FROM APLICANTE_EMPLEADO WHERE Departamento='${dept}' AND Estado='aceptado'`
  );
  if (respGetApl.status == 400) {
    res.status(400).json({ message: respGetApl.message });
  } else {
    res
      .status(200)
      .json(respGetApl.data);
  }
});

// Obtiene los empleados de su departamento
router.post("/getEmpleadosC", async function (req, res, next) {
  const {dept} =req.body
  let respGetEmpl = await service.connect(
    `SELECT * FROM APLICANTE_EMPLEADO WHERE Departamento='${dept}' AND Estado='contratado'`
  );
  if (respGetEmpl.status == 400) {
    res.status(400).json({ message: respGetEmpl.message });
  } else {
    res
      .status(200)
      .json(respGetEmpl.data);
  }
});


module.exports = router;