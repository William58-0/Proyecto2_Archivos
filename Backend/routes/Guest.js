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
router.post("/califPuesto", async function (req, res, next) {
  const { puesto, departamento, calificacion } = req.body

  let respConsult = await service.connect(
    `SELECT Valor FROM CALIFICACION WHERE Puesto = '${puesto}' AND Departamento='${departamento}'`
  );

  console.log(respConsult.data)

  // se calcula el promedio
  let total=0;
  for(let i=0;i<respConsult.data.length;i++){
    total+=parseInt(respConsult.data[i].VALOR);
  }
  total+=parseInt(calificacion);

  let promedio=0;
  if(respConsult.data.length==0){
    promedio=parseInt(total);
  }else{
    promedio=parseInt(parseInt(total)/(respConsult.data.length+1));
  }
  
  // se actualiza el promedio en la tabla del puesto
  let respActData = await service.connect(
    `UPDATE PUESTO SET CalifPromedio=${promedio} WHERE Nombre = '${puesto}' AND Departamento='${departamento}'`
  );

  let now= new Date();
  const fecha = now.getDay() + "/" + now.getMonth() + "/" + now.getFullYear()

  // se inserta la calificacion a la tabla
  // INSERT INTO CALIFICACION VALUES('HOY',3, 'Supervisor de RRHH', 'RRHH');
  let respIns = await service.connect(
    `INSERT INTO CALIFICACION VALUES('${fecha}', ${calificacion},'${puesto}','${departamento}')`
  );

  if (respActData.status == 400 && respIns.status == 400) {
    res.status(400).json('no se pudo');
  } else {
    res
      .status(200)
      .json('');
  }

});

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
    `SELECT Nombre FROM COORDINADOR_REVISOR t WHERE t.ParaRevisar = ( SELECT MIN( ParaRevisar )  FROM COORDINADOR_REVISOR WHERE Tipo='Revisor' AND Departamento = '${departamento}' AND Estado = 'Activo') AND t.Tipo='Revisor' AND t.DEPARTAMENTO = '${departamento}'`
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

module.exports = router;