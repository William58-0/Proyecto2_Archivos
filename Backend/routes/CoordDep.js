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
  // Se cambia a aceptado el estado del aplicante y se le asigna su contraseña
  // Se le crea una contraseña, será Date.now
  var actual = Date.now()
  // UPDATE APLICANTE_EMPLEADO SET Estado = 'Inactivo' WHERE Nombre = 'Anderson';
  let respAcetpApl = await service.connect(
    `UPDATE APLICANTE_EMPLEADO SET Estado='contratado' WHERE DPI=${dpi}`
  );
  // Se le envia un mensaje al aplicante con las creedenciales
  console.log(actual)
  let responseReq = await service.connect(
    `INSERT INTO MENSAJE VALUES ('Sistema',${actual}, '${dpi}', 'Fue contratado en su puesto')`
  );

  if (respAcetpApl.status == 400 && responseReq.status == 400) {
    res.status(400).json({ message: respAcetpApl.message });
  } else {
    res
      .status(200)
      .json({ message: "aceptado correctamente" });
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