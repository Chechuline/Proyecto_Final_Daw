'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var elementoSchema=Schema({
    nombre:String,
    tags:[String],
    imagen:String
});

module.exports=mongoose.model('Elemento',elementoSchema);