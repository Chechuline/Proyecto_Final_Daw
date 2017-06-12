'use strict'

var express=require('express');
var bodyParser=require('body-parser');
var app=express();

//cargar rutas
var routes = require('./routes/rutas');

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//habilitar la carpeta public para acceso
app.use('/', express.static(__dirname + '/public'));


//configurar cabeceras http
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTION,PUT,DELETE,PATCH');
    res.header('Allow','GET,POST,OPTION,PUT,DELETE,PATCH');
    next();
})

//rutas base
app.use('/api', routes);

// app.use('/*', (req,res)=>{
//     res.redirect('/')
// });

app.use('/*', (req,res,next)=>{
    res.redirect('/index');
    next();});
//app.use(userRoutes);

// app.get("/pruebas",function(req,resp){
//     resp.status(200).send({message: "zona de pruebas"});
// });


//exportacion
module.exports=app;
