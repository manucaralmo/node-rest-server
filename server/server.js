require('./config/config.js');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//BODYPARSE MIDDLEWARES
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

 
app.post('/usuario', function (req, res) {
    let body = req.body;

    if(body.nombre === undefined){
        res.status(400).json({
            ok: false,
            mensaje: "Faltan campos obligatorios"
        });
    } else {
        res.json({
            usuario: body
        });
    }
});

app.post('/usuario/:id', function (req, res) {
    let id = req.params.id
    res.json({
        id
    })
  })
 


app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto 3000');
})