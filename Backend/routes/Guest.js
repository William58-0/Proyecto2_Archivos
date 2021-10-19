var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

//const service = require("./connection.js");
const service = require("./connection.js");
const cors = require("cors");

router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// inserta un nuevo aplicante cuando el que era guest llena sus datos
router.post("/insertAplicante", async function (req, res, next) {
  const { dpi, nombres, apellidos, correo, direccion, telefono, depart, puesto, revisor } = req.body
  let now= new Date();
  const fechainicio = now.getDay() + "/" + now.getMonth() + "/" + now.getFullYear()
  // INSERT INTO APLICANTE_EMPLEADO VALUES
  // (2797652900101,'william alejandro', 'borrayo alarcon', '-', 'wiliamborryo@gmail.com', 'casa', '1234', 'pendiente', 'hoy', 'maniana',1,'reev1', 'uno', 'unopuesto' );
  let respInsApl = await service.connect(
    `INSERT INTO APLICANTE_EMPLEADO VALUES
    (${dpi},'${nombres}','${apellidos}','-','${correo}','${direccion}','${telefono}','pendiente','${fechainicio}','-',1,'${revisor}','${depart}','${puesto}')`
  );
  console.log(respInsApl)
  if (respInsApl.status == 400) {
    res.status(400).json({ message: respInsApl.message });
  } else {
    res
      .status(200)
      .json(respInsApl.data);
  }
  // se actualiza el trabajo del revisor
  // UPDATE COORDINADOR_REVISOR SET ParaRevisar = ParaRevisar + 1 WHERE Nombre='reev1' AND Tipo='Revisor' AND Departamento='uno' AND Estado='Activo'
  let respTrabRev = await service.connect(
    `UPDATE COORDINADOR_REVISOR SET ParaRevisar = ParaRevisar + 1 WHERE Nombre = '${revisor}' AND Tipo='Revisor' AND Departamento='${depart}' AND Estado='Activo'`
  );
  console.log(respTrabRev)
  if (respTrabRev.status == 400) {
    res.status(400).json({ message: respTrabRev.message });
  } else {
    res
      .status(200)
      .json(respTrabRev.data);
  }
});

// Selecciona al revisor con menos trabajo para asignarselo al nuevo aplicante
router.post("/getRevisor", async function (req, res, next) {
  const { departamento } = req.body
  // SELECT Nombre FROM COORDINADOR_REVISOR t WHERE t.ParaRevisar = ( SELECT MIN( ParaRevisar )
  // FROM COORDINADOR_REVISOR WHERE Tipo='Revisor' AND DEPARTAMENTO = 'RRHH') AND t.Tipo='Revisor' AND t.DEPARTAMENTO = 'RRHH'
  let respGetRev = await service.connect(
    `SELECT Nombre FROM COORDINADOR_REVISOR t WHERE t.ParaRevisar = ( SELECT MIN( ParaRevisar )  FROM COORDINADOR_REVISOR WHERE Tipo='Revisor' AND DEPARTAMENTO = '${departamento}') AND t.Tipo='Revisor' AND t.DEPARTAMENTO = '${departamento}'`
  );
  console.log(respGetRev)
  if (respGetRev.status == 400) {
    res.status(400).json({ message: respGetRev.message });
  } else {
    res
      .status(200)
      .json(respGetRev.data);
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
    jsonData = JSON.parse(jsonData)
  });
  var arregloDep = jsonData.departamentos.departamento
  console.log("INSERTANDO DEPARTAMENTOS")
  for (let contDep = 0; contDep < arregloDep.length; contDep++) { // ------------------------------------------ CICLO DEPARTAMENTOS
    var nombreDep = arregloDep[contDep].nombre[0]
    var capDep = arregloDep[contDep].capital_total[0]
    let responseDep = await service.connect(
      `BEGIN INSERT INTO DEPARTAMENTO VALUES('${nombreDep}',${capDep}); COMMIT; END;`
    );
    var arregloPuestos = arregloDep[contDep].puestos[0].puesto
    console.log("INSERTANDO PUESTOS")
    for (let contPuesto = 0; contPuesto < arregloPuestos.length; contPuesto++) { // ------------------------------------------ CICLO PUESTOS
      var nombrePuesto = arregloPuestos[contPuesto].nombre[0]
      var salPuesto = arregloPuestos[contPuesto].salario[0]
      // INSERT INTO PUESTO VALUES('unopuesto', 2000.50, 3, 28, 'uno');
      let responsePuesto = await service.connect(
        `BEGIN INSERT INTO PUESTO VALUES('${nombrePuesto}',${salPuesto},0,0,'${nombreDep}'); COMMIT; END;`
      );
      var arregloCat = arregloPuestos[contPuesto].categorias[0].categoria
      console.log("INSERTANDO CATEGORIAS")
      for (let contCat = 0; contCat < arregloCat.length; contCat++) { // ------------------------------------------ CICLO CATEGORIAS
        var nombreCat = arregloCat[contCat].nombre[0]
        // INSERT INTO CATEGORIA VALUES('unocategoria','unopuesto', 'uno' );
        let responseCategoria = await service.connect(
          `BEGIN INSERT INTO CATEGORIA VALUES('${nombreCat}','${nombrePuesto}','${nombreDep}'); COMMIT; END;`
        );
      }
      var arregloReq = arregloPuestos[contPuesto].requisitos[0].requisito
      console.log("INSERTANDO REQUISITOS")
      for (let contReq = 0; contReq < arregloReq.length; contReq++) { // ------------------------------------------ CICLO REQUISITOS
        var nombreReq = arregloReq[contReq].nombre[0]
        var tamanioReq = arregloReq[contReq].tamaño[0]
        var obligReq = arregloReq[contReq].obligatorio[0]
        var arregloFormat = arregloReq[contReq].formatos[0].formato
        console.log("INSERTANDO FORMATOS")
        for (let contFormat = 0; contFormat < arregloFormat.length; contFormat++) { // ------------------------------------------ CICLO FORMATOS
          var nombreFormat = arregloFormat[contFormat].nombre[0]
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
  let now = new Date();
  const fechainicio = now.getDay() + "/" + now.getMonth() + "/" + now.getFullYear()

  // INSERT INTO COORDINADOR_REVISOR VALUES('coord1','1234', 'hoy', 'maniana', 'Coordinador', 'Activo', 'uno' );
  let response = await service.connect(
    `BEGIN INSERT INTO COORDINADOR_REVISOR VALUES('${nombre}','${contrasenia}','${fechainicio}','-','${tipo}','Activo','${departamento}'); COMMIT; END;`
  );

  if (response.status == 400) {
    res.status(400).json({ message: response.message });
  } else {
    res
      .status(200)
      .json({ message: "Usuario creado correctamente" });
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
      .json({ message: "Usuario actualizado correctamente" });
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
      .json({ message: "Usuario eliminado correctamente" });
  }

});


module.exports = router;