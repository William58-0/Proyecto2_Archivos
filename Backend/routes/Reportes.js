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
  try {

    let connection
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `BEGIN
        PUESTOS_REP( :cursor);
       END;`,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      });

    const resultSet = result.outBinds.cursor;

    let rows;
    rows = await resultSet.getRows(maxRows);
    console.log(result.outBinds.cursor.metaData);
    data = []
    for (let i = 0; i < rows.length; i++) {
      obj = {
        'DEPARTAMENTO': rows[i][0],
        'PUESTO': rows[i][1],
        'CAPITAL': rows[i][2],
        'CAPDIS': rows[i][3],
        'SALARIO': rows[i][4],
      }
      data.push(obj)
    }

    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: 'error' });
    }

  } catch {
    console.log("aaaaaa")
  }
});

router.get("/Rep1ApEmp", async function (req, res, next) {    // tambien  sirve como rep2
  try {

    let connection
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `BEGIN
        APLICANTE_EMPLEADO_REP( :cursor);
       END;`,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      });

    const resultSet = result.outBinds.cursor;

    let rows;
    rows = await resultSet.getRows(maxRows);
    //console.log(result.outBinds.cursor.metaData);
    data = []
    for (let i = 0; i < rows.length; i++) {
      nombre=rows[i][2] + " " + rows[i][3]
      //nombre=rows[i][2]
      obj = {
        'DEPARTAMENTO': rows[i][0],
        'DPI': rows[i][1],
        'NOMBRE': nombre,
        'ESTADO': rows[i][4],
        'REVISOR': rows[i][5],
      }
      data.push(obj)
    }

    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: 'error' });
    }

  } catch {
    console.log("aaaaaa")
  }
});

router.get("/Rep1CoordRev", async function (req, res, next) {
  try {

    let connection
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `BEGIN
      COORDINADOR_REVISOR_REP( :cursor);
       END;`,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      });

    const resultSet = result.outBinds.cursor;

    let rows;
    rows = await resultSet.getRows(maxRows);
    //console.log(result.outBinds.cursor.metaData);
    data = []
    for (let i = 0; i < rows.length; i++) {
      //nombre=rows[i][2]
      obj = {
        'DEPARTAMENTO': rows[i][0],
        'NOMBRE': rows[i][1],
        'TIPO': rows[i][2],
        'ESTADO': rows[i][3],
        'FECHAINICIO': rows[i][4],
      }
      data.push(obj)
    }

    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: 'error' });
    }

  } catch {
    console.log("aaaaaa")
  }
});

router.get("/Rep3", async function (req, res, next) {
  try {

    let connection
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `BEGIN
        TOP5_DEPS_CONTRADOS( :cursor);
       END;`,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      });

    const resultSet = result.outBinds.cursor;

    let rows;
    rows = await resultSet.getRows(maxRows);
    //console.log(result.outBinds.cursor.metaData);
    data = []
    for (let i = 0; i < rows.length; i++) {
      //nombre=rows[i][2]
      obj = {
        'DEPARTAMENTO': rows[i][0],
        'CONTRATADOS': rows[i][1]
      }
      data.push(obj)
    }

    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: 'error' });
    }

  } catch {
    console.log("aaaaaa")
  }
});

router.get("/Rep4", async function (req, res, next) {
  try {

    let connection
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `BEGIN
        TOP5_REVS_INV( :cursor);
       END;`,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      });

    const resultSet = result.outBinds.cursor;

    let rows;
    rows = await resultSet.getRows(maxRows);
    //console.log(result.outBinds.cursor.metaData);
    data = []
    for (let i = 0; i < rows.length; i++) {
      //nombre=rows[i][2]
      obj = {
        'REVISOR': rows[i][0],
        'INVITACIONES': rows[i][1]
      }
      data.push(obj)
    }

    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: 'error' });
    }

  } catch {
    console.log("aaaaaa")
  }
});

router.get("/Rep5", async function (req, res, next) {
  try {

    let connection
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `BEGIN
        TOP5_DOCSRECH_APLICANTES( :cursor);
       END;`,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      });

    const resultSet = result.outBinds.cursor;

    let rows;
    rows = await resultSet.getRows(maxRows);
    //console.log(result.outBinds.cursor.metaData);
    data = []
    for (let i = 0; i < rows.length; i++) {
      //nombre=rows[i][2]
      obj = {
        'APLICANTE': rows[i][0],
        'RECHAZOS': rows[i][1]
      }
      data.push(obj)
    }

    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: 'error' });
    }

  } catch {
    console.log("aaaaaa")
  }
});

router.get("/Rep6", async function (req, res, next) {
  try {

    let connection
    connection = await oracledb.getConnection(dbConfig);

    const result = await connection.execute(
      `BEGIN
        TOP5_CAP_USADO_DEP( :cursor);
       END;`,
      {
        cursor: { type: oracledb.CURSOR, dir: oracledb.BIND_OUT }
      });

    const resultSet = result.outBinds.cursor;

    let rows;
    rows = await resultSet.getRows(maxRows);
    data = []
    for (let i = 0; i < rows.length; i++) {
      obj = {
        'NOMBRE': rows[i][0],
        'CAPITAL': rows[i][1],
        'CAPDIS': rows[i][2],
        'CNT': rows[i][3],
        'MEJORPUESTO': rows[i][4]
      }
      data.push(obj)
    }

    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(400).json({ message: 'error' });
    }

  } catch {
    console.log("aaaaaa")
  }
});

module.exports = router;