// REQUIRES
const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
// REQUIRES

// =================================================================

// LISTAR USUARIOS
app.get('/usuarios', function (req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios) => {
                if(err) {   
                    return  res.status(400).json({
                            ok: false,
                            err
                    });
                }

                Usuario.count({ estado: true }, (err, conteo) => {
                    res.json({
                        ok: true,
                        usuarios,
                        cuantos: conteo
                    });
                });
            })
});
// LISTAR USUARIOS

// =================================================================

// CREAR UN USUARIO
app.post('/usuario', function (req, res) {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync( body.password, 10),
        role: body.role
    });

    usuario.save( (err, usuarioDB) => {

        if(err) {   
            return  res.status(400).json({
                    ok: false,
                    err
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioDB
        });

    });
});
// CREAR UN USUARIO

// =================================================================

// EDITAR UN USUARIO
app.put('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick( req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate( id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                    ok: false,
                    err
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        })

    });

});
// EDITAR UN USUARIO

// =================================================================

// ELIMINAR UN USUARIO
// No eliminamos, sino que cambiamos estado a false
// PARA ELIMINAR --> Usuario.findByIdAndDelete( id, (err, usuarioDB) => {
app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;

    let cambiarEstado = {
        estado: false
    };

    Usuario.findByIdAndUpdate( id, cambiarEstado, { new: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                    ok: false,
                    err
            });
        }

        if (!usuarioDB){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});
// ELIMINAR UN USUARIO

// =================================================================

module.exports = app;