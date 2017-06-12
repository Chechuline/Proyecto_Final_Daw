/*
    Enrutador de usuarios
*/
'use strict'

var express = require('express');

var userController = require("../controllers/user");
var setsController = require("../controllers/conjuntos");
// var elementsController = require("../controllers/element");

var md_auth = require("../middlewares/authenticated");

var multipart = require("connect-multiparty");
var md_upload = multipart({
    uploadDir: "./back/public/upload/elementos/"
});

var api = express.Router();

//controles Usuario
api.get('/pruebaControlador', md_auth.ensureAuth, userController.pruebas);//especificamos la ruta y que metodo se ejecutara
api.post('/register', userController.saveUser);
api.post('/login', userController.loginUser);
api.get('/user/:id', md_auth.ensureAuth, userController.getUser);

//controles Conjuntos
api.post('/user/:id/sets', md_auth.ensureAuth, setsController.nuevo);
//subirImagen
api.post('/user/:id/sets/upload-image', md_auth.ensureAuth, md_upload, setsController.subirImagen);

api.get('/user/:id/sets', md_auth.ensureAuth, setsController.list);
api.get('/user/:id/sets/:setId', md_auth.ensureAuth, setsController.simple);
api.patch('/user/:id/sets/:setId', md_auth.ensureAuth, setsController.update);
api.delete('/user/:id/sets/:setId', md_auth.ensureAuth, setsController.remove);
api.get('/user/:id/sets/find/:busqueda', md_auth.ensureAuth, setsController.buscar);

//controles Elemento de conjuntos
/*api.post('/sets/:id/:elementId',md_auth.ensureAuth,elementsController.nuevo);
api.get('/sets/:id/',md_auth.ensureAuth,elementsController.list);
api.patch('/sets/:id/:elementId',md_auth.ensureAuth,elementsController.update);
api.delete('/sets/:id/:elementId',md_auth.ensureAuth,elementsController.remove);*/

module.exports = api;