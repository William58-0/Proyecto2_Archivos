var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
const path = require('path');
const multer = require('multer');


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

router.get("/getPuestos", async function (req, res, next) {
  let responsePuesto = await service.connect(
    `SELECT * FROM PUESTO`
  );
  if (responsePuesto.status == 400) {
    res.status(400).json({ message: responsePuesto.message });
  } else {
    res
      .status(200)
      .json(responsePuesto.data);
  }
});

router.post("/Login", async function (req, res, next) {
  console.log("llego a esto")
  const { nombre, contrasenia } = req.body
  let responseLogin = await service.connect(
    `SELECT * FROM COORDINADOR_REVISOR WHERE Nombre = '${nombre}' AND Contrasenia='${contrasenia}'`
  );
  if (responseLogin.status == 400) {
    res.status(400).json({ message: responseLogin.message });
  } else {
    res
      .status(200)
      .json(responseLogin.data);
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

router.post("/getRequisitos", async function (req, res, next) {
  const { departamento, puesto } = req.body;
  let responseReq = await service.connect(
    `SELECT DISTINCT NOMBRE, FORMATO, TAMANIO, OBLIGATORIO FROM REQUISITO WHERE DEPARTAMENTO ='${departamento}' AND PUESTO='${puesto}'`
  );
  if (responseReq.status == 400) {
    res.status(400).json({ message: responseReq.message });
  } else {
    res
      .status(200)
      .json(responseReq.data);
  }
});

const storage = multer.diskStorage({
  destination: path.join(__dirname, './public_html/', 'uploads'),
  filename: function (req, file, cb) {
      console.log(file)
      // null as first argument means no error
      cb(null,file.originalname)
  }
})

const uploadImage = multer({
  storage
}).single('image');

router.post('/imageupload', async (req, res) => {
  try {
     let upload = multer({ storage: storage}).single('avatar');
     
     upload(req, res, function(err) {
         if (!req.file) {
             return res.send('Seleccionar archivo');
         }
         else if (err instanceof multer.MulterError) {
             return res.send(err);
         }
         else if (err) {
             return res.send(err);
         } else {
            return res.send('sepudo');
         }
         
         const classifiedsadd = {
             image: req.file.filename
         };
         
     });  
} catch (err) {console.log(err)}
});


module.exports = router;