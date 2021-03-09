'use strict';

const express = require('express');
const Cancion = require('../models/cancion.model');
const router = new express.Router();

router.post('/registrar-cancion', (req, res) => {
    let cancion = JSON.parse(req.body.cancion);

    let nueva_cancion = new Cancion({
        'nombre': cancion.nombre,
        'duracion': cancion.duracion,
        'album': cancion.album,
        'estado': 'Activo'
    });
    nueva_cancion.save((err, cancion_db) => {
        if (err) {
            res.json({
                'msj': 'No se pudo registrar la canción',
                err
            })
        } else {
            res.json({
                'msj': 'La canción se registro correctamente',
                cancion_db
            })
        }
    });
});

router.post('/agregar-artista-cancion', (req, res) => {
    let cancion_id = JSON.parse(req.body.cancion_id);
    let artista = JSON.parse(req.body.artista);

    if (cancion_id) {
        Cancion.updateOne({ _id: cancion_id }, {
                $push: {
                    'artista': {
                        nombre: artista.nombre,
                        casa_disquera: artista.casa_disquera,
                        fecha_nacimiento: artista.fecha_nacimiento,
                        edad: artista.edad,
                        estado: artista.estado,
                    }
                }
            },
            (error) => {
                if (error) {
                    return res.json({
                        success: false,
                        msj: 'No se pudo agregar el artista',
                        error
                    });
                } else {
                    return res.json({
                        success: true,
                        msj: 'Se agregó correctamente el artista'
                    });
                }
            }
        )
    } else {
        return res.json({
            success: false,
            msj: 'No se pudo agregar el artista, por favor verifique que el _id sea correcto'
        });
    }
});

router.get('/listar-cancion', (req, res) => {
    Cancion.find((err, coleccion_canciones) => {
        if (err) {
            res.json({
                'msj': 'No se pudo listar las canciones',
                err
            })
        } else {
            res.json({
                'msj': 'Las canciones se listaron correctamente',
                coleccion_canciones
            })
        }
    });
});

router.post('/actualizar-estado-cancion', (req, res) => {
    let cancion = JSON.parse(req.body.cancion);

    Cancion.findOneAndUpdate({ _id: cancion._id }, { estado: cancion.estado }, (err, coleccion_cancion) => {
        if (err) {
            res.json({
                'msj': 'No se encontro el album',
                err
            })
        } else {
            if (coleccion_cancion) {
                res.json({
                    coleccion_cancion
                })
            } else {
                res.json({
                    'msj': 'No se actualizo'
                });
            }
        }
    });
});

router.put('/modificar-cancion', (req, res) => {
    let cancion = JSON.parse(req.body.cancion);

    Cancion.updateOne({ _id: cancion._id }, {
        $set: {
            'nombre': cancion.nombre,
            'duracion': cancion.duracion,
            'artista': cancion.artista,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar la cancion',
                err
            });
        } else {
            res.json({
                info
            });
        }
    });

});

router.get('/eliminar-cancion-id', (req, res) => {
    Cancion.findOneAndDelete({ _id: req.query._id }, (err, coleccion_canciones) => {
        if (err) {
            res.json({
                'msj': 'No se encontro la canción',
                err
            })
        } else {
            if (coleccion_canciones) {
                res.json({
                    'msj': 'La canción se elimino correctamente',
                    coleccion_canciones
                })
            } else {
                res.json({
                    'msj': 'No se elimino'
                });
            }
        }
    });
});

module.exports = router;