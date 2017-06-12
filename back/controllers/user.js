'use strict'
/*
    controlador de usuarios
*/
var User = require('../models/usuario');
var Datos = require('../models/datos');
var bCrypt = require('bcrypt-nodejs');//encripta
var jwt = require('../services/jwt');
var fs = require("fs");
var path = require("path");

//prueba
function pruebas(req, res) {
    res.status(200).send({
        mensaje: "probando controlador usuario para la aplicacion de mongo y node"
    });
}

//almacena los datos de usuario
function saveUser(req, res) {
    var user = new User();
    var datos = new Datos();
    var params = req.body;

    datos.nombre = params.nombre;
    datos.apellidos = params.apellidos;
    datos.foto = 'null';

    user.usuario = params.usuario;
    user.email = params.email;

    if (undefined != params.passwd) {
        bCrypt.hash(params.passwd, null, null, function (error, hash) {
            user.passwd = hash;
            if (user.usuario != null && user.email != null && user.passwd != null) {
                //si el usuario y el mail no existe lo guarda
                Promise.all([
                    (User.findOne({ usuario: user.usuario.toLowerCase() }).count((err, count) => { return count; })),
                    (User.findOne({ email: user.email.toLowerCase() }).count((err, count) => { return count; }))
                ])
                    .then((count) => {
                        var sum = count.reduce((a, b) => a + b, 0);
                        if (sum != 0) {
                            res.status(404).send({ message: "error", error:"Usuario o email ya en uso" });
                        } else {
                            //guardo los datos de usuario
                            datos.save((error, datosGuardados) => {
                                if (!error) {
                                    (!datosGuardados) ? res.status(500).send({message: "error", error:"Error al guardar datos de usuario" }) : console.log(datosGuardados);
                                }
                            });
                            user.datos = datos;
                            user.save((error, usuarioGuardado) => {
                                if (!error) {
                                    if (!usuarioGuardado) {
                                        res.status(500).send({ message: "error", error:"Error al guardar usuario" })
                                    } else {
                                        res.status(200).send({ message: 'OK' });
                                    }
                                }
                            });

                        }
                    }
                    );
            } else {
                res.status(200).send({message: "error", error:"Introduce todos los campos obligatorios" });
            }
        });
    } else { res.status(500).send({ message: "error", error:"Contraseña obligatoria" }); }
}


//comprueba que el usuario existe y es correcto
function loginUser(req, res) {
    var params = req.body;
    var usuario = params.usuario;

    User.findOne({ usuario: usuario.toLowerCase() }, (error, user) => {
        if (error) {
            res.status(500).send({ message: "error", error:"Error en la peticion" });
        } else {
            if (!user) {
                res.status(404).send({ message: "error", error:"usuario o contraseña incorrecto"});
            } else {
                //comprobamos contraseña
                bCrypt.compare(params.passwd, user.passwd, function (error, result) {

                    if (error) {
                        res.status(404).send({message: "error", error:"usuario o contraseña incorrecto"});
                    } else {
                        if (result) {
                            if (params.gethash) {
                                //devolver token jwt
                                res.status(200).send({
                                    token: jwt.createToken(user),
                                    id: user.id
                                });
                            } else {
                                //devuelve usuario cambiar a error, ya que se necesita el token continuamente
                                res.status(404).send({ message:"error", error: "token obligatorio" });
                                //res.status(404).send({message: "token necesario"});
                            }
                        } else {
                            res.status(404).send({ message: "error", error:"usuario o contraseña incorrecto"});
                        }
                    }
                });
            }
        }
    });
}
// devuelve datos de usuario
function getUser(req, res) {
    var user = req.user;

    User.findOne({ usuario: user.usuario.toLowerCase() }, (error, user) => {
        if (error) {
            res.status(404).send({ message: "no se pudo obtener el usuario" });
        } else {
            Datos.findOne({ _id: user.datos }, (error, datos) => {
                if (!error && datos) {
                    let usuario = {}
                    usuario.nombre = datos.nombre;
                    usuario.apellidos = datos.apellidos;
                    usuario.email = user.email;
                    usuario.usuario = user.usuario;

                    res.status(200).send({ message: "ok", usuario: usuario });
                }
            })

        }
    });

}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    getUser
}