var express = require("express");
var bodyParser = require("body-parser");
var router = express.Router();
var oracledb = require("oracledb");

const cors = require("cors");
const { maxRows } = require("oracledb");

router.use(cors({ origin: true, optionsSuccessStatus: 200 }));
router.use(bodyParser.json({ limit: "50mb", extended: true }));
router.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

var dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING,
};

// inserta un nuevo aplicante cuando el que era guest llena sus datos
router.get("/Rep1Puestos", async function (req, res, next) {
  try{

    let connection
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `BEGIN
        pruebaa( :cursor);
       END;`,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      });
      console.log("llegaa a estooo 2" )
    console.log("Cursor metadata:");
    //console.log(result.outBinds.cursor.metaData);

    const resultSet = result.outBinds.cursor;
    console.log(resultSet)
    const numRows = 2;  // number of rows to return from each call to getRows()
    let rows;
    rows = await resultSet.getRows(maxRows);
    console.log(rows)
    // If getRows(numRows) returns:
    //   Zero rows               => there were no rows, or are no more rows to return
    //   Fewer than numRows rows => this was the last set of rows to get
    //   Exactly numRows rows    => there may be more rows to fetch

    do {
      rows = await resultSet.getRows(numRows); // get numRows rows at a time
      if (rows.length > 0) {
        console.log("getRows(): Got " + rows.length + " rows");
        console.log(rows);
      }else{
        console.log("ya no hay")
      }
    } while (rows.length === numRows);
    
  }catch{
      console.log("aaaaaa")
  }
  
  /*
  console.log(respConsult)

  if (respConsult.status == 400) {
    res.status(400).json('no se pudo');
  } else {
    res
      .status(200)
      .json(respConsult.data);
  }
*/
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

/*
CREATE OR REPLACE PROCEDURE pruebaa (curr OUT SYS_REFCURSOR)
       AS
       BEGIN
         OPEN curr FOR
           SELECT *
           FROM   DEPARTAMENTO;
       END;

      BEGIN pruebaa; END; -- este no sirve
*/