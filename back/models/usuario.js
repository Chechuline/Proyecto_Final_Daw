'use strict'

var mongoose=require('mongoose');
var Schema=mongoose.Schema;

//define esquema para poder ser utilizado en mongoDB con mongoose
var userSchema= Schema({
    usuario: { type: String, unique: true, required:true },
    passwd:  { type: String, required:true},
    email: { type: String, unique: true, required:true },
    datos: { type: Schema.ObjectId, ref: 'Datos'}
});

module.exports=mongoose.model('User', userSchema); //envia el esquema para su utilizacion