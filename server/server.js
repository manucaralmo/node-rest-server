
// REQUIRES
require('./config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
// REQUIRES


//BODYPARSE MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//BODYPARSE MIDDLEWARES

// HABILITAR PUBLIC
app.use( express.static( path.resolve(__dirname , '../public') ) );
 
// RUTAS
app.use( require('./routes/index') );
// RUTAS


// CONEXION BD
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