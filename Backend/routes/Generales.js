var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

//const service = require("./connection.js");
const service = require("./connection.js");
const cors = require("cors");

router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.get("/getDepartamentos", async function (req, res, next) {
  let responseDep = await service.connect(
    `SELECT Nombre FROM DEPARTAMENTO`
  );
  if (responseDep.status == 400) {
    res.status(400).json({ message: responseDep.message });
  } else {
    res
      .status(200)
      .json(responseDep.data);
  }
});

router.get("/getUsuarios", async function (req, res, next) {
  let responseUsers = await service.connect(
    `SELECT * FROM COORDINADOR_REVISOR`
  );
  if (responseUsers.status == 400) {
    res.status(400).json({ message: responseUsers.message });
  } else {
    res
      .status(200)
      .json(responseUsers.data);
  }
});

router.post("/getUsuario", async function (req, res, next) {
  const { original } = req.body;

  let responseUser = await service.connect(
    `SELECT * FROM COORDINADOR_REVISOR WHERE Nombre = '${original}'`
  );
  if (responseUser.status == 400) {
    res.status(400).json({ message: responseUser.message });
  } else {
    res
      .status(200)
      .json(responseUser.data);
  }

});


module.exports = router;