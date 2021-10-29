var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

//const service = require("./connection.js");
const service = require("./connection.js");
const cors = require("cors");

// Para lo del correo
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: 'temporalt696@gmail.com',
    pass: 'sslrvmxtusrxmywa',
  },
});

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

router.post("/aceptarAplicante", async function (req, res, next) {
  const { dpi } = req.body;
  // Se cambia a aceptado el estado del aplicante y se le asigna su contraseña
  // Se le crea una contraseña, será Date.now
  var actual = Date.now()
  // UPDATE APLICANTE_EMPLEADO SET Estado = 'Inactivo' WHERE Nombre = 'Anderson';
  let respAcetpApl = await service.connect(
    `UPDATE APLICANTE_EMPLEADO SET Estado='aceptado', Contrasenia='${actual}' WHERE DPI=${dpi}`
  );
  // Se le envia un mensaje al aplicante con las creedenciales
  console.log(actual)
  let responseReq = await service.connect(
    `INSERT INTO MENSAJE VALUES ('Sistema',${actual}, '${dpi}', 'Fue aceptado por su revisor, su contraseña es: ${actual}')`
  );

  // para enviar correo real
  try {
    var mensaje = "Fue aceptado por su revisor, su contraseña es: "+actual;

    var mailOptions = {
      from: 'temporalt696@gmail.com',
      to: 'wiliamborrayo@gmail.com',    // aqui se le pondria el correo
      subject: 'Correo real',
      text: mensaje
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email enviado: ' + info.response);
      }
    });
  } catch {
    console.log("no se pudo enviar correo real :(")
  }

  if (respAcetpApl.status == 400 && responseReq.status == 400) {
    res.status(400).json({ message: respAcetpApl.message });
  } else {
    res
      .status(200)
      .json({ message: "aceptado correctamente" });
  }
});

router.post("/aceptarArchivo", async function (req, res, next) {
  const { dpi, documento, formato, revisor } = req.body;
  // se cambia el estado del archivo
  let respAceptpArch = await service.connect(
    `UPDATE DOCUMENTO SET Estado='aceptado' WHERE Aplicante='${dpi}' AND Nombre='${documento}' AND Formato='${formato}'`
  );

  // Si ya no tiene documentos pendientes por revisar se acepta todo su expediente
  let respPenRev = await service.connect(
    `SELECT * FROM DOCUMENTO WHERE Aplicante='${dpi}' AND (Estado='pendiente' OR Estado='rechazado')`
  );

  // si ya todo fue aceptado
  if (respPenRev.data.length == 0) {
    // cambia el estado del aplicante
    let respAceptApli = await service.connect(
      `UPDATE APLICANTE_EMPLEADO SET Estado='aceptado' WHERE DPI='${dpi}'`
    );

    // se resta la cantidad de trabajo al revisor
    let respRestApli = await service.connect(
      `UPDATE COORDINADOR_REVISOR SET ParaRevisar = ParaRevisar - 1 WHERE Nombre = '${revisor}' AND Tipo='Revisor'`
    );

  }

  if (respAceptpArch.status == 400 && respPenRev.status == 400
    && respPenRev.status == 400 && respAceptApli.status == 400
    && respRestApli.status == 400) {
    res.status(400).json({ message: 'algo no salio bien' });
  } else {
    res
      .status(200)
      .json({ message: "aceptado correctamente" });
  }
});

// Obtiene los aplicantes de su departamento
router.post("/getAplicantesR", async function (req, res, next) {
  const { rev } = req.body
  console.log(req.body)

  let respGetApl = await service.connect(
    `SELECT * FROM APLICANTE_EMPLEADO WHERE Revisor='${rev}'`
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

// Obtiene los aplicantes de su departamento
router.post("/rechazarDoc", async function (req, res, next) {
  const { documento, motivo, formato, dpi } = req.body
  let now= new Date();
  var actual = Date.now();
  const fecha = now.getUTCDate() + "/" + now.getUTCMonth() + "/" + now.getFullYear()
  let respRechDoc = await service.connect(
    // INSERT INTO RECHAZO VALUES('BOLETO DE ORNATO','hoy', 'no sirve', 'pdf', 201909103);
    `INSERT INTO RECHAZO VALUES('${documento}','${fecha}','${motivo}','${formato}',${dpi})`
  );
  console.log(respRechDoc)
  let respUpdEst = await service.connect(
    // INSERT INTO RECHAZO VALUES('BOLETO DE ORNATO','hoy', 'no sirve', 'pdf', 201909103);
    `UPDATE DOCUMENTO SET Estado='rechazado' WHERE Aplicante='${dpi}' AND Nombre='${documento}' AND Formato='${formato}'`
  );

  let respMessage = await service.connect(
    `INSERT INTO MENSAJE VALUES ('Sistema',${actual}, '${dpi}', 'Se rechazo: ${documento} . ${formato}  por: ${motivo}')`
  );

  if (respRechDoc.status == 400 && respUpdEst.status == 400) {
    res.status(400).json({ message: 'no se pudo' });
  } else {
    res
      .status(200)
      .json(respRechDoc.data);
  }
});

// Obtiene los empleados de su departamento
router.post("/getEmpleadosR", async function (req, res, next) {
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
router.post("/descartarAplicante", async function (req, res, next) {
  const { dpi } = req.body;
  let now = new Date();
  const fechafin = now.getUTCDate() + "/" + now.getUTCMonth() + "/" + now.getFullYear()
  let response = await service.connect(
    `UPDATE APLICANTE_EMPLEADO SET Estado='descartado', FechaFin='${fechafin}' WHERE DPI='${dpi}'`
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