require("dotenv").config();

var express = require("express");
var app = express();
var corsOptions = { origin: true, optionsSuccessStatus: 200 };

const cors = require("cors");


var usuarios = require("./routes/usuarios");
var peliculas = require("./routes/peliculas");
var AdminSistema = require("./routes/AdminSistema");



app.use(cors(corsOptions));
app.use("/usuarios", usuarios);
app.use("/peliculas", peliculas);
app.use("/AdminSistema", AdminSistema);


app.listen(9000, () => {
  console.debug("Servidor escuchando en puerto: 9000");
});

module.exports = app;