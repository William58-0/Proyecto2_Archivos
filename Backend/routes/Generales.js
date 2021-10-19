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
    `SELECT DISTINCT NOMBRE, FORMATO, TAMANIO, OBLIGATORIO FROM REQUISITO WHERE Departamento ='${departamento}' AND Puesto='${puesto}'`
  );
  if (responseReq.status == 400) {
    res.status(400).json({ message: responseReq.message });
  } else {
    res
      .status(200)
      .json(responseReq.data);
  }
});


router.post("/getMensajes", async function (req, res, next) {
  const { perfil } = req.body;
  let resGetMsj = await service.connect(
    `SELECT * FROM MENSAJE WHERE Emisor ='${perfil}' OR Receptor='${perfil}' ORDER BY Orden ASC`
  );
  console.log(resGetMsj)

  if (resGetMsj.status == 400) {
    res.status(400).json({ message: resGetMsj.message });
  } else {
    res
      .status(200)
      .json(resGetMsj.data);
  }

});

// INSERT INTO MENSAJE VALUES ('william580',12, '2797652900101', 'stas');
router.post("/sendMessage", async function (req, res, next) {
  const { emisor, texto, receptor } = req.body;
  var actual = Date.now()
  let responseReq = await service.connect(
    `INSERT INTO MENSAJE VALUES ('${emisor}',${actual}, '${receptor}', '${texto}')`
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
  destination: path.join(__dirname, '../Documentos/'),
  filename: function (req, file, cb) {
    console.log(file)
    // null as first argument means no error
    cb(null, file.originalname)
  }
})

const uploadImage = multer({
  storage
}).single('image');

router.post('/imageupload', async (req, res) => {
  try {
    let upload = multer({ storage: storage }).single('avatar');
    upload(req, res, async function (err) {
      if (!req.file) {
        return res.send('Seleccionar archivo');
      }
      else if (err instanceof multer.MulterError) {
        return res.send(err);
      }
      else if (err) {
        return res.send(err);
      } else {
        const classifiedsadd = {
          name: req.file.filename
        };
        var orgname = classifiedsadd.name
        var formato = orgname.split(".", 2)[1]
        var name = (orgname.split("_", 2)[1]).split(".", 2)[0]
        var aplicante = orgname.split("_", 2)[0]
        console.log(orgname)
        console.log(formato)
        console.log(name)
        console.log(aplicante)
        // primero ve si existe el documento
        let respDocIn1 = await service.connect(
          `SELECT * FROM DOCUMENTO WHERE Nombre='${name}' AND Formato='${formato}' AND Aplicante='${aplicante}'`
        );
        // si no existe inserta uno nuevo
        if (respDocIn1.data.length == 0) {
          let respDocIn = await service.connect(
            `INSERT INTO DOCUMENTO VALUES('${name}','${formato}', 'pendiente', '${aplicante}')`
          );
          if (respDocIn.status == 400) {
            res.status(400).json({ message: respDocIn.message });
          } else {
            res
              .status(200)
              .json('sepudo');
          }
        }
        // si ya existe solo le actualiza el estado a pendiente
        else {
          let respDocIn = await service.connect(
            `UPDATE DOCUMENTO SET Estado='pendiente' WHERE Nombre='${name}' AND Formato='${formato}' AND Aplicante='${aplicante}'`
          );
          if (respDocIn.status == 400) {
            res.status(400).json({ message: respDocIn.message });
          } else {
            res
              .status(200)
              .json('sepudo');
          }
        }
      }
    });
  } catch (err) { console.log(err) }
});

router.post("/abrirDocumento", async function (req, res, next) {
  const { dpi, documento, formato } = req.body;
  var archivo = dpi + '_' + documento + '.' + formato
  // verificar si existe el archivo
  const fs = require('fs')
  const path = './Documentos/' + archivo

  var existe = false
  try {
    if (fs.existsSync(path)) {
      //file exist
      existe = true
    }
  } catch (err) {
    console.error(err)
    existe = false
  }

  if (existe) {
    //const fs = require('fs');
    // destination.txt will be created or overwritten by default.
    fs.copyFile(path, './../Frontend/src/Documentos/file.'+formato, (err) => {
      if (err) { res.status(400).json(err); }
      else {
        res
          .status(200)
          .json("Se cargo archivo");
      }
      console.log('archivo copiado');
    });
  }else{
    res.status(400).json("no existe el archivo");
  }
});

router.post("/getDocs", async function (req, res, next) {
  const { dpi } = req.body;
  let respGetDocs = await service.connect(
    `SELECT * FROM DOCUMENTO WHERE Aplicante='${dpi}'`
  );
  console.log(respGetDocs)
  if (respGetDocs.status == 400) {
    res.status(400).json({ message: respGetDocs.message });
  } else {
    res
      .status(200)
      .json(respGetDocs.data);
  }
});


module.exports = router;