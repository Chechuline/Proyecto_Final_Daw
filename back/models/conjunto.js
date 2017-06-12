'use strict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var conjuntoSchema=Schema({
    usuario:String,
    nombre:String,
    elementos:[{ type: Schema.ObjectId, ref: 'Elemento'}]

});

module.exports=mongoose.model('Conjunto',conjuntoSchema);