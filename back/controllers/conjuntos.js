'use strict'
var User = require('../models/usuario');
var Datos = require('../models/datos');


var Sets = require('../models/conjunto');
var Element = require('../models/elemento');

var bCrypt = require('bcrypt-nodejs');//encripta
var jwt = require('../services/jwt');
var fs = require("fs");
var path = require("path");

//envia un elemento
function simple(req, res) {
    let setId = req.params.setId;

    Sets.findById(setId, (error, conjunto) => {
        if (error) {
            res.status(502).json({ message: 'error', error: 'no se pudo crear el conjunto' });
        }
        if (!conjunto) {
            res.status(502).json({ message: 'error', error: 'no se pudo guardar el conjunto' });
        }
        let conjuntoTemp = {};
        conjuntoTemp.id = conjunto.id;
        conjuntoTemp.nombre = conjunto.nombre;
        conjuntoTemp.elementos = [];


        //recojo todos los elementos del conjunto y si tiene elementos, genero su busqueda
        if (conjunto.elementos.length != 0) {
            let promesas = conjunto.elementos.map(elemento => {

                return Element.find(elemento);
            });

            // cuando encuentre todos los elementos del conjunto, se preparan y envian al cliente
            Promise.all(promesas)
                .then((resultado) => {
                    resultado.map((elem) => {
                        let elementoTemp = {}
                        elementoTemp['id'] = elem[0].id;
                        elementoTemp['nombre'] = elem[0].nombre;
                        elementoTemp['tags'] = elem[0].tags;
                        elementoTemp['imagen'] = (elem[0].imagen) ? elem[0].imagen : undefined;

                        conjuntoTemp.elementos.push(elementoTemp);
                    });

                    res.status(200).json({ message: 'ok', conjunto: conjuntoTemp });
                })
                .catch((error) => {
                    res.status(400).json({ message: 'error', error: 'no se pudo encontrar elementos' });
                })

        } else {
            res.status(200).json({ message: 'ok', conjunto: conjuntoTemp });
        }
    });
}
//lista todos los conjuntos de usuario
function list(req, res) {
    var user = req.user;

    Sets.find({ usuario: user.sub }, (error, conjuntos) => {
        if (error) {
            res.status(502).json({ message: 'error', error: 'no se pudo crear el conjunto' });
        }
        if (!conjuntos) {
            res.status(502).json({ message: 'error', error: 'no se pudo guardar el conjunto' });
        }
        let obj = conjuntos.map((item, ind) => {
            if (item._doc.hasOwnProperty('nombre')) {
                return item._doc;
            }
            else {
                item._doc.nombre = 'dummy' + ind
                return item._doc;
            }
        });

        res.status(200).json({
            message: 'ok', conjuntos: obj
        })
    });


}

//guarda un nuevo conjunto
function nuevo(req, res) {
    var user = req.user;

    var conjunto = new Sets();
    conjunto.usuario = user.sub;
    conjunto.nombre = req.body.nombre;
    let temElementos = req.body.elementos;
    if (conjunto.nombre == null || conjunto.nombre == "") {
        res.status(302).json({ message: 'error', error: 'nombre no puede estar vacio' })
    } else {

        //guardo los elementos primero
        let elementos = temElementos.map((elemento) => {
            let tempElement = new Element();
            tempElement.nombre = elemento.nombre
            tempElement.tags = elemento.tags.split(",");
            tempElement.imagen = elemento.imagen;
            /*return new Promise((resolve, reject) => {
                tempElement.save((error, elemento) => {
                    if (error) reject(error);
                    resolve(elemento);
                });
            })*/
            return tempElement.save();
        })

        //una vez guardados, guardo el conjuntos
        Promise.all(elementos)
            .then(
            elemento => {
                console.log(elemento);
                conjunto.elementos = elemento;
                conjunto.save((error, conjunto) => {
                    if (error) {
                        res.status(502).json({ message: 'error', error: 'no se pudo crear el conjunto' });
                    }
                    if (!conjunto) {
                        res.status(502).json({ message: 'error', error: 'no se pudo guardar el conjunto' });
                    }
                    res.status(200).json({ message: 'guardado correctamente', obj: conjunto });
                })
            })
            .catch(
            err => {
                res.status(502).json({ message: 'error', error: 'error al guardar elementos' });
            })
    }
}
//actualiza un conjunto y sus elementos
function update(req, res) {
    console.log("actualizar conjunto");
    //res.status(200).json({ message: 'ok' })


    let elementosTemp = req.body.elementos;
    //busca un elemento por su id y sobreescribe sus propiedades
    let elementsPromises = elementosTemp.map((elemento) => {
        return Element.findByIdAndUpdate(elemento.id, elemento, { upsert: true, new: true }).exec();
    });

    Promise.all(elementsPromises)
        .then((elementos) => {
            Sets.findByIdAndUpdate(req.body.id, { nombre: req.body.nombre }, (error, conjunto) => {
                if (error) res.status(502).json({ message: 'error', error: 'no se pudo actualizar el conjunto' })
                res.status(200).json({ message: 'actualizado correctamente' });
            })
        })
        .catch((err) => {
            res.status(502).json({ message: 'error', error: 'no se pudo actualizar el elemento ' })
        });

    // Element.findByIdAndUpdate(req.body.elementos, (error, elementos) => {
    //     if (error) res.status(502).json({ message: 'error', error: 'no se pudo actualizar el elemento ' });
    //     Sets.findByIdAndUpdate({ id: req.body.id, nombre: req.body.nombre }, () => {
    //         if (error) res.status(502).json({ message: 'error', error: 'no se pudo eliminar el conjunto' });
    //         res.status(200).json({ message: 'actualizado' })
    //     })
    // })
}
// elimina el conjunto seleccionado y sus elementos asociados
function remove(req, res) {

    function eliminar(conjuntoId=undefined) {
        Sets.findByIdAndRemove(conjuntoId, (err, result) => {
            if (err) {
                res.status(502).json({ message: 'error', error: 'no se pudo eliminar el conjunto' });
            }

            res.status(200).json({ message: 'borrado' })
        });
    }

    let conjuntoId = req.params.setId;


    Sets.findById(conjuntoId, (err, conjunto) => {

        // elimino elementos
        if (conjunto.elementos.length != 0) {
            let promesas = conjunto.elementos.map(elemento => {

                return Element.findOneAndRemove(elemento).exec();
            });
            Promise.all(promesas)
            .then((resultado)=>{
                //si elimina bien los elementos, elimino el conjunto
                eliminar(conjuntoId);
            })
            .catch((error)=>{
                res.status(502).json({ message: 'error', error: 'no se pudo eliminar el elemento' });
            })

            // Element.remove(conjunto.elementos, (err, reslt) => {
            //     if (err) {
            //         res.status(502).json({ message: 'error', error: 'no se pudo eliminar el conjunto' });
            //     }
            //     res.status(200).json({ message: 'borrado' })
            // });
        } else {
            // Elimino conjunto
            eliminar(conjuntoId)
        }




    })
}
//envia los conjuntos que cumplan la busqueda
function buscar(req, res) {
    console.log("lelga");
    let userId = req.params.id;
    let busqueda = req.params.busqueda

    // Sets.find({usuario:userId,nombre:{ "$regex": busqueda, "$options": "i" }},(error,conjuntos)=>{
    //     if (error) throw error

    //     res.status(200).json({ message: 'ok', conjuntos: conjuntos});
    // });
    Sets.find({ usuario: userId }, (error, conjuntos) => {
        if (error) throw error
        res.status(200).json({ message: 'ok', conjuntos: conjuntos });
    }).or([{ nombre: { "$regex": busqueda, "$options": "i" } }]);



}
//guarda una imagen de manera temporal y envia su nombre en servidor
function subirImagen(req, res) {
    var userId = req.params.id;
    var fileName = 'no subido';
    var files = req.files;
    if (req.files) {
        var filePath = req.files.imagen.path;
        var file_split = filePath.split('\\');
        fileName = file_split[4];

        var ext_split = fileName.split('\.');
        var ext = ext_split[1].toLowerCase();

        if (ext == 'png' || ext == 'jpg' || ext == "gif") {
            res.status(200).send({ message: 'subida correctamente', image: fileName });
        } else {
            res.status(200).send({ message: 'error', error: "extension no valida" });
        }
    } else {
        res.status(404).send({ message: 'error', error: "imagen no subida" });
    }
}



module.exports = {
    simple,
    list,
    nuevo,
    update,
    remove,
    buscar,
    subirImagen

}