var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();

//const service = require("./connection.js");
const service = require("./connection.js");
const cors = require("cors");

router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

router.post("/LoginGuest", async function (req, res, next) {
  const { dpi, correo } = req.body
  let responseLogin = await service.connect(
    `SELECT * FROM APLICANTE_EMPLEADO WHERE DPI = '${dpi}' AND Correo='${correo}'`
  );
  if (responseLogin.status == 400) {
    res.status(400).json({ message: responseLogin.message });
  } else {
    res
      .status(200)
      .json(responseLogin.data);
  }
});

module.exports = router;

