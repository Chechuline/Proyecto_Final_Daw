'use strict'
/*
    Middelware para generar token y darle fecha de expiracion
*/
var jwt=require("jwt-simple");
var moment=require("moment");
let date=moment();
var secret="clave_secreta";

exports.createToken = function(user){
    var payload ={
        sub: user._id,
        usuario: user.usuario,
        nombre: user.datos.nombre,
        apellidos: user.datos.apellidos,
        email: user.email,
        role: user.role,
        logueado: date.unix(),
        exp: date.add(30, 'days').unix()
    }

    return jwt.encode(payload, secret);
};
