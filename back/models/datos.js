'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var datosSchema=Schema({
    nombre: String,
    apellidos: String,
    foto:String
});

module.exports=mongoose.model('Datos', datosSchema);
