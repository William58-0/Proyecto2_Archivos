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

router.post("/aceptarAplicante", async function (req, res, next) {  
  const { dpi } = req.body;
  // UPDATE APLICANTE_EMPLEADO SET Estado = 'Inactivo' WHERE Nombre = 'Anderson';
  let respAcetpApl = await service.connect(
    `UPDATE APLICANTE_EMPLEADO SET Estado='aceptado' WHERE DPI=${dpi}`
  );
  console.log(respAcetpApl)
  if (respAcetpApl.status == 400) {
    res.status(400).json({ message: respAcetpApl.message });
  } else {
      res
        .status(200)
        .json({ message: "aceptado correctamente"});
  }
});

// Obtiene los aplicantes de su departamento
router.post("/getAplicantesR", async function (req, res, next) {
  const {dept} =req.body
  console.log(req.body)
  
  let respGetApl = await service.connect(
    `SELECT * FROM APLICANTE_EMPLEADO WHERE Departamento='${dept}' AND Estado='pendiente'`
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

// Obtiene los empleados de su departamento
router.post("/getEmpleadosR", async function (req, res, next) {
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