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

 /*

 const xml2js = require('xml2js');

// XML string to be parsed to JSON
const xml = `<?xml version="1.0" encoding="UTF-8" ?>
            <user id="1">
                <name>John Doe</name>
                <email>john.doe@example.com</email>
                <roles>
                    <role>Member</role>
                    <role>Admin</role>
                </roles>
                <admin>true</admin>
            </user>`;

// convert XML to JSON
xml2js.parseString(xml, (err, result) => {
    if(err) {
        throw err;
    }

    // `result` is a JavaScript object
    // convert it to a JSON string
    const json = JSON.stringify(result, null, 4);

    // log JSON string
    console.log(json);
    
});

*/