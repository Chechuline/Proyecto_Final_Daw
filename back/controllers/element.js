'use strict'
var User = require('../models/usuario');
var Datos = require('../models/datos');


var Sets = require('../models/conjunto');
var Element = require('../models/elemento');

var bCrypt = require('bcrypt-nodejs');//encripta
var jwt = require('../services/jwt');
var fs = require("fs");
var path = require("path");

function list(req, res) {
    var user=req.user;

    console.log("lista de elementos");
    res.status(200).json({message:'ok'})
}
function nuevo(req,res){
    //añade elementos a un conjunto
    console.log("nuevo elemento");
    
    res.status(200).json({message:'ok'})
}

function update(req,res){
    console.log("actualizar elemento");
    res.status(200).json({message:'ok'})
}
function remove(req,res){
    console.log("eliminar elemento");
    res.status(200).json({message:'ok'})
}

module.exports = {
    list,
    nuevo,
    update,
    remove

}