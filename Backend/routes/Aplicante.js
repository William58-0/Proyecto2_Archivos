var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

//const service = require("./connection.js");
const service = require("./connection.js");
const cors = require("cors");

router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// Para que el aplicante ingrese a la plataforma
router.post("/LoginAplicante", async function (req, res, next) {
  const { dpi, contrasenia } = req.body
  let responseLogin = await service.connect(
    `SELECT * FROM APLICANTE_EMPLEADO WHERE DPI = ${dpi} AND Contrasenia='${contrasenia}'`
  );
  console.log(responseLogin)

  if (responseLogin.status == 400) {
    res.status(400).json({ message: responseLogin.message });
  } else {
    res
      .status(200)
      .json(responseLogin.data);
  }

});

// Para que el aplicante ingrese a la plataforma
router.post("/getDatosAplicante", async function (req, res, next) {
  const { dpi } = req.body
  let respGetData = await service.connect(
    `SELECT * FROM APLICANTE_EMPLEADO WHERE DPI = ${dpi}`
  );
  console.log(respGetData)

  if (respGetData.status == 400) {
    res.status(400).json({ message: respGetData.message });
  } else {
    res
      .status(200)
      .json(respGetData.data);
  }
  
});

// Para que el aplicante ingrese a la plataforma
router.post("/actualizarDatos", async function (req, res, next) {
  const { dpi, nombres, apellidos, correo, direccion, telefono } = req.body
  let respActData = await service.connect(
    `UPDATE APLICANTE_EMPLEADO SET Nombres='${nombres}', Apellidos='${apellidos}', Correo='${correo}', Direccion='${direccion}', Telefono='${telefono}', PrimerLogin=0 WHERE DPI=${dpi}`
  );
  console.log(respActData)
  if (respActData.status == 400) {
    res.status(400).json({ message: respActData.message });
  } else {
    res
      .status(200)
      .json(respActData.data);
  }
});

// Para obtener el revisor asignado
router.post("/getRevisorAsignado", async function (req, res, next) {
  const { dpi } = req.body
  let respGetRevAsig = await service.connect(
    `SELECT Revisor FROM APLICANTE_EMPLEADO WHERE DPI = '${dpi}'`
  );
  console.log(respGetRevAsig)
  if (respGetRevAsig.status == 400) {
    res.status(400).json({ message: respGetRevAsig.message });
  } else {
    res
      .status(200)
      .json(respGetRevAsig.data);
  }
});

// Para que el aplicante ingrese a la plataforma
router.post("/getRechazos", async function (req, res, next) {
  const { dpi } = req.body
  let respGetData = await service.connect(
    `SELECT * FROM RECHAZO WHERE Aplicante = ${dpi}`
  );
  console.log(respGetData)

  if (respGetData.status == 400) {
    res.status(400).json({ message: respGetData.message });
  } else {
    res
      .status(200)
      .json(respGetData.data);
  }
  
});


module.exports = router;