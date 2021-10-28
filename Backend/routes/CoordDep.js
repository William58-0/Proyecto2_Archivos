var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

//const service = require("./connection.js");
const service = require("./connection.js");
const cors = require("cors");

router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Obtiene los aplicantes de su departamento
router.post("/getAplicantesC", async function (req, res, next) {
  const { dep } = req.body
  console.log(req.body)

  let respGetApl = await service.connect(
    `SELECT * FROM APLICANTE_EMPLEADO WHERE Departamento='${dep}'`
  );
  console.log(respGetApl)
  if (respGetApl.status == 400) {
    res.status(400).json({ message: respGetApl.message });
  } else {
    res
      .status(200)
      .json(respGetApl.data);
  }
});

router.post("/contratarAplicante", async function (req, res, next) {
  const { dpi } = req.body;
  // se verifica que haya capital disponible en el departamento
  let respVerifDep = await service.connect(
    `SELECT CAPITAL, CAPDIS FROM DEPARTAMENTO WHERE NOMBRE = (SELECT DEPARTAMENTO FROM APLICANTE_EMPLEADO ae WHERE DPI=${dpi})`
  );

  let CapDis = respVerifDep.data[0].CAPDIS

  let respVerifPuesto = await service.connect(
    `SELECT SALARIO FROM PUESTO WHERE NOMBRE = (SELECT PUESTO FROM APLICANTE_EMPLEADO ae WHERE DPI=${dpi})`
  );

  let Salario = respVerifPuesto.data[0].SALARIO
  let dif = CapDis - Salario

  var HayCapital = false
  if (dif >= 0) {
    console.log("todavia se puede")
    HayCapital = true
  } else {
    console.log("ya no se puede")
    HayCapital = false
  }

  if (HayCapital) {
    // Se cambia a aceptado el estado del aplicante y se le asigna su contraseña
    // Se le crea una contraseña, será Date.now
    var actual = Date.now()
    // UPDATE APLICANTE_EMPLEADO SET Estado = 'Inactivo' WHERE Nombre = 'Anderson';
    let respAcetpApl = await service.connect(
      `UPDATE APLICANTE_EMPLEADO SET Estado='contratado' WHERE DPI=${dpi}`
    );
    // Se le envia un mensaje al aplicante diciendole que fue contratado
    let responseReq = await service.connect(
      `INSERT INTO MENSAJE VALUES ('Sistema',${actual}, '${dpi}', 'Fue contratado en su puesto')`
    );

    // Se actualiza el capital disponible para el departamento
    let respActCap = await service.connect(
      `UPDATE DEPARTAMENTO SET CAPDIS=${dif} WHERE NOMBRE=(SELECT DEPARTAMENTO FROM APLICANTE_EMPLEADO WHERE DPI=${dpi})`
    );

    if (respAcetpApl.status == 400 || responseReq.status == 400 || respActCap.status == 400) {
      res.status(400).json({ message: 'Algo paso ;(' });
    } else {
      res
        .status(200)
        .json({ message: "aceptado correctamente" });
    }
  } else {
    res
      .status(200)
      .json({ message: "Ya no hay suficiente capital" });
  }
});

// Obtiene los empleados de su departamento
router.post("/getEmpleadosC", async function (req, res, next) {
  const { dept } = req.body
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

// para descartar aplicantes
router.post("/descartarApRevisado", async function (req, res, next) {
  const { dpi } = req.body;
  let now = new Date();
  const fechafin = now.getDay() + "/" + now.getMonth() + "/" + now.getFullYear()
  // para actualizar el estado del aplicante
  let response = await service.connect(
    `UPDATE APLICANTE_EMPLEADO SET Estado='descartado', FechaFin='${fechafin}' WHERE DPI='${dpi}'`
  );
  console.log(response)

  // ------------------------------------------------ se recupera el capital
  let respVerifDep = await service.connect(
    `SELECT CAPITAL, CAPDIS FROM DEPARTAMENTO WHERE NOMBRE = (SELECT DEPARTAMENTO FROM APLICANTE_EMPLEADO ae WHERE DPI=${dpi})`
  );

  let CapDis = respVerifDep.data[0].CAPDIS

  let respVerifPuesto = await service.connect(
    `SELECT SALARIO FROM PUESTO WHERE NOMBRE = (SELECT PUESTO FROM APLICANTE_EMPLEADO ae WHERE DPI=${dpi})`
  );

  let Salario = respVerifPuesto.data[0].SALARIO
  let dif = CapDis + Salario

  // Se actualiza el capital disponible para el departamento
  let respActCap = await service.connect(
    `UPDATE DEPARTAMENTO SET CAPDIS=${dif} WHERE NOMBRE=(SELECT DEPARTAMENTO FROM APLICANTE_EMPLEADO WHERE DPI=${dpi})`
  );

  if (response.status == 400 || respActCap.status == 400) {
    res.status(400).json({ message: response.message });
  } else {
    res
      .status(200)
      .json({ message: "Usuario eliminado correctamente" });
  }

});


module.exports = router;