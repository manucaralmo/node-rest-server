
// REQUIRES
require('./config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
// REQUIRES


//BODYPARSE MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//BODYPARSE MIDDLEWARES

 
// RUTAS
app.use( require('./routes/usuario') );
// RUTAS

mongoose.connect(process.env.URLDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Conectado a Mongo");
});
// CONEXION BD


// CONEXION PUERTO
app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto 3000');
});
// CONEXION PUERTO