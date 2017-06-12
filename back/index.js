'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.port || 3977;



//conexion a BBDD
mongoose.connect('mongodb://localhost:27017/proyecto', (err, resp) => {
    if (err) {
        console.log('error al conectar');
        throw err}
    else {
        console.log("conectado");

        app.listen(port, function () {
            console.log("servidor api REST escuchando en http://localhost:" + port);
        });

    }
});
