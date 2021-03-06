var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

//const service = require("./connection.js");
const service = require("./connection.js");
const cors = require("cors");

router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

var Departamentos = []
var Puestos = []
var Categorias = []
var Requisitos = []
var Formatos = []
var DepartamentosEscritos = []
var PuestosEscritos = []
var CategoriasEscritas = []
var RequisitosEscritos = []
var FormatosEscritos = []
var ParaRetornar = {}


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

  // se limpian los arreglos para mostrar los datos unicos
  Departamentos = []
  Puestos = []
  Categorias = []
  Requisitos = []
  Formatos = []
  DepartamentosEscritos = []
  PuestosEscritos = []
  CategoriasEscritas = []
  RequisitosEscritos = []
  FormatosEscritos = []


  var arregloDep = jsonData.departamentos.departamento
  //console.log(arregloDep)
  EscribirRespuesta(arregloDep)
  InsertData(arregloDep);

  res
    .status(200)
    .json(ParaRetornar);

});

async function EscribirRespuesta(arregloDep) {
  for (let contDep = 0; contDep < arregloDep.length; contDep++) { // ------------------------------------------ CICLO DEPARTAMENTOS
    var nombreDep = arregloDep[contDep].nombre[0]
    var capDep = arregloDep[contDep].capital_total[0]

    var objDep = { 'NOMBRE': nombreDep, 'CAPITAL': capDep }

    if (!DepartamentosEscritos.includes(nombreDep)) {
      DepartamentosEscritos.push(nombreDep)
      Departamentos.push(objDep)
    }

    var arregloPuestos = arregloDep[contDep].puestos[0].puesto

    for (let contPuesto = 0; contPuesto < arregloPuestos.length; contPuesto++) { // ------------------------------------------ CICLO PUESTOS
      var nombrePuesto = arregloPuestos[contPuesto].nombre[0]
      var salPuesto = arregloPuestos[contPuesto].salario[0]

      var objPuesto = { 'NOMBRE': nombrePuesto, 'SALARIO': salPuesto }

      if (!PuestosEscritos.includes(nombrePuesto)) {
        PuestosEscritos.push(nombrePuesto)
        Puestos.push(objPuesto)
      }

      var arregloCat = arregloPuestos[contPuesto].categorias[0].categoria

      for (let contCat = 0; contCat < arregloCat.length; contCat++) { // ------------------------------------------ CICLO CATEGORIAS
        var nombreCat = arregloCat[contCat].nombre[0]

        var objCategoria = { 'NOMBRE': nombreCat }

        if (!CategoriasEscritas.includes(nombreCat)) {
          CategoriasEscritas.push(nombreCat)
          Categorias.push(objCategoria)
        }

      }
      var arregloReq = arregloPuestos[contPuesto].requisitos[0].requisito

      for (let contReq = 0; contReq < arregloReq.length; contReq++) { // ------------------------------------------ CICLO REQUISITOS
        var nombreReq = arregloReq[contReq].nombre[0]
        var tamanioReq = arregloReq[contReq].tama??o[0]
        var obligReq = arregloReq[contReq].obligatorio[0]
        var arregloFormat = arregloReq[contReq].formatos[0].formato

        var objReq = { 'NOMBRE': nombreReq }

        if (!RequisitosEscritos.includes(nombreReq)) {
          RequisitosEscritos.push(nombreReq)
          Requisitos.push(objReq)
        }

        for (let contFormat = 0; contFormat < arregloFormat.length; contFormat++) { // ------------------------------------------ CICLO FORMATOS
          var nombreFormat = arregloFormat[contFormat].nombre[0]

          var objFormat = { 'NOMBRE': nombreFormat }

          if (!FormatosEscritos.includes(nombreFormat)) {
            FormatosEscritos.push(nombreFormat)
            Formatos.push(objFormat)
          }

        }
      }
    }
    var HayMasDep = false
    var arregloDepIns = []
    try {
      arregloDepIns = arregloDep[contDep].departamentos[0].departamento
      console.log(arregloDepIns)
      if (arregloDepIns == undefined) {
        HayMasDep = false
      } else {
        HayMasDep = true
      }
    } catch {
      HayMasDep = false
    }
    if (HayMasDep) {
      EscribirRespuesta(arregloDepIns)
    } else {
      // se prepara el json de respuesta
      respuesta = { Departamentos, Puestos, Categorias, Requisitos, Formatos }
      ParaRetornar = respuesta
    }
  }
}


async function InsertData(arregloDep) {
  console.log("INSERTANDO DEPARTAMENTOS")
  for (let contDep = 0; contDep < arregloDep.length; contDep++) { // ------------------------------------------ CICLO DEPARTAMENTOS
    var nombreDep = arregloDep[contDep].nombre[0]
    var capDep = arregloDep[contDep].capital_total[0]
    let responseDep = await service.connect(
      `BEGIN INSERT INTO DEPARTAMENTO VALUES('${nombreDep}',${capDep},${capDep}); COMMIT; END;`
    );

    console.log(responseDep)
    var objDep = { 'NOMBRE': nombreDep, 'CAPITAL': capDep }

    if (!DepartamentosEscritos.includes(nombreDep)) {
      DepartamentosEscritos.push(nombreDep)
      Departamentos.push(objDep)
    }

    var arregloPuestos = arregloDep[contDep].puestos[0].puesto
    console.log("INSERTANDO PUESTOS")
    for (let contPuesto = 0; contPuesto < arregloPuestos.length; contPuesto++) { // ------------------------------------------ CICLO PUESTOS
      var nombrePuesto = arregloPuestos[contPuesto].nombre[0]
      var salPuesto = arregloPuestos[contPuesto].salario[0]
      // INSERT INTO PUESTO VALUES('unopuesto', 2000.50, 3, 'uno');
      let responsePuesto = await service.connect(
        `BEGIN INSERT INTO PUESTO VALUES('${nombrePuesto}',${salPuesto},0,'${nombreDep}'); COMMIT; END;`
      );

      var objPuesto = { 'NOMBRE': nombrePuesto, 'SALARIO': salPuesto }

      if (!PuestosEscritos.includes(nombrePuesto)) {
        PuestosEscritos.push(nombrePuesto)
        Puestos.push(objPuesto)
      }

      var arregloCat = arregloPuestos[contPuesto].categorias[0].categoria
      console.log("INSERTANDO CATEGORIAS")
      for (let contCat = 0; contCat < arregloCat.length; contCat++) { // ------------------------------------------ CICLO CATEGORIAS
        var nombreCat = arregloCat[contCat].nombre[0]
        // INSERT INTO CATEGORIA VALUES('unocategoria','unopuesto', 'uno' );
        let responseCategoria = await service.connect(
          `BEGIN INSERT INTO CATEGORIA VALUES('${nombreCat}','${nombrePuesto}','${nombreDep}'); COMMIT; END;`
        );

        var objCategoria = { 'NOMBRE': nombreCat }

        if (!CategoriasEscritas.includes(nombreCat)) {
          CategoriasEscritas.push(nombreCat)
          Categorias.push(objCategoria)
        }

      }
      var arregloReq = arregloPuestos[contPuesto].requisitos[0].requisito
      console.log("INSERTANDO REQUISITOS")
      for (let contReq = 0; contReq < arregloReq.length; contReq++) { // ------------------------------------------ CICLO REQUISITOS
        var nombreReq = arregloReq[contReq].nombre[0]
        var tamanioReq = arregloReq[contReq].tama??o[0]
        var obligReq = arregloReq[contReq].obligatorio[0]
        var arregloFormat = arregloReq[contReq].formatos[0].formato

        var objReq = { 'NOMBRE': nombreReq }

        if (!RequisitosEscritos.includes(nombreReq)) {
          RequisitosEscritos.push(nombreReq)
          Requisitos.push(objReq)
        }


        console.log("INSERTANDO FORMATOS")



        for (let contFormat = 0; contFormat < arregloFormat.length; contFormat++) { // ------------------------------------------ CICLO FORMATOS
          var nombreFormat = arregloFormat[contFormat].nombre[0]
          // INSERT INTO REQUISITO VALUES('dosrequisito','unopuesto','uno', 'pdf', 20, 1 );
          let responseCategoria = await service.connect(
            `BEGIN INSERT INTO REQUISITO VALUES('${nombreReq}','${nombrePuesto}','${nombreDep}','${nombreFormat}',${tamanioReq},${obligReq}); COMMIT; END;`
          );

          var objFormat = { 'NOMBRE': nombreFormat }

          if (!FormatosEscritos.includes(nombreFormat)) {
            FormatosEscritos.push(nombreFormat)
            Formatos.push(objFormat)
          }

        }
      }
    }
    var HayMasDep = false
    var arregloDepIns = []
    try {
      arregloDepIns = arregloDep[contDep].departamentos[0].departamento
      console.log(arregloDepIns)
      if (arregloDepIns == undefined) {
        HayMasDep = false
      } else {
        HayMasDep = true
      }
    } catch {
      HayMasDep = false
    }
    if (HayMasDep) {
      InsertData(arregloDepIns)
    } else {
      // se prepara el json de respuesta
      respuesta = { Departamentos, Puestos, Categorias, Requisitos, Formatos }
      //console.log(respuesta)
      ParaRetornar = respuesta
    }
  }
  console.log("Termino de insertar")
}

router.post("/registrarusuario", async function (req, res, next) {
  const { nombre, contrasenia, tipo, departamento } = req.body;
  let now = new Date();
  const fechainicio = now.getUTCDate() + "/" + now.getUTCMonth() + "/" + now.getFullYear()

  // busca si ya existe el revisor
  let respGetUser = await service.connect(
    `SELECT * FROM  COORDINADOR_REVISOR WHERE Nombre='${nombre}'`
  );

  // si no existe
  if (respGetUser.data.length == 0) {
    // INSERT INTO COORDINADOR_REVISOR VALUES('coord1','1234', 'hoy', 'maniana', 'Coordinador', 'Activo', 0, 'uno' );
    let response = await service.connect(
      `BEGIN INSERT INTO COORDINADOR_REVISOR VALUES('${nombre}','${contrasenia}','${fechainicio}','-','${tipo}','Activo',0,'${departamento}'); COMMIT; END;`
    );

    if (response.status == 400) {
      res.status(400).json({ message: response.message });
    } else {
      res
        .status(200)
        .json({ message: "Usuario creado correctamente" });
    }
  }
  // si ya existe que solo le actualice el estado y la fecha de inicio
  else {
    // INSERT INTO COORDINADOR_REVISOR VALUES('coord1','1234', 'hoy', 'maniana', 'Coordinador', 'Activo', 0, 'uno' );
    let response = await service.connect(
      `UPDATE COORDINADOR_REVISOR SET Contrasenia='${contrasenia}',FechaInicio='${fechainicio}',FechaFin='-',Tipo='${tipo}',Estado='Activo',ParaRevisar=0,Departamento='${departamento}' WHERE Nombre='${nombre}'`
    );

    if (response.status == 400) {
      res.status(400).json({ message: response.message });
    } else {
      res
        .status(200)
        .json({ message: "Usuario creado correctamente" });
    }
  }


});

router.post("/editarusuario", async function (req, res, next) {
  const { original, nombre, contrasenia, tipo, departamento } = req.body;

  // UPDATE COORDINADOR_REVISOR SET Nombre = 'william', Contrasenia='nueva', Tipo='Rev', Departamento='uno' WHERE Nombre = 'Anderson';
  let response = await service.connect(
    `UPDATE COORDINADOR_REVISOR SET Contrasenia='${contrasenia}', Tipo='${tipo}', Departamento='${departamento}' WHERE Nombre='${original}'`
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
  let now = new Date();
  const fechafin = now.getUTCDate() + "/" + now.getUTCMonth() + "/" + now.getFullYear()
  // UPDATE COORDINADOR_REVISOR SET Estado = 'Inactivo' WHERE Nombre = 'Anderson';
  let response = await service.connect(
    `UPDATE COORDINADOR_REVISOR SET Estado='Inactivo', FechaFin='${fechafin}' WHERE Nombre='${nombre}'`
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