require("dotenv").config();

var express = require("express");
var app = express();
var corsOptions = { origin: true, optionsSuccessStatus: 200 };

const cors = require("cors");

var Generales = require("./routes/Generales");
var usuarios = require("./routes/usuarios");
var peliculas = require("./routes/peliculas");
var AdminSistema = require("./routes/AdminSistema");
var CoordDep = require("./routes/CoordDep");
var Aplicante = require("./routes/Aplicante");
var Guest = require("./routes/Guest");
var Revisor = require("./routes/Revisor");

app.use(cors(corsOptions));
app.use("", Generales);
app.use("/usuarios", usuarios);
app.use("/peliculas", peliculas);
app.use("/AdminSistema", AdminSistema);
app.use("/CoordDep", CoordDep);
app.use("/Aplicante", Aplicante);
app.use("/Guest", Guest);
app.use("/Revisor", Revisor);

app.listen(9000, () => {
  console.debug("Servidor escuchando en puerto: 9000");
});

module.exports = app;

