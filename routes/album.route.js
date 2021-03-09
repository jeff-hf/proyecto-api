'use strict';

const express = require('express');
const Album = require('../models/album.model');
const router = new express.Router();

router.post('/registrar-album', (req, res) => {
    let album = JSON.parse(req.body.album);

    let nuevo_album = new Album({
        'codigo': album.codigo,
        'nombre': album.nombre,
        'fecha_lanzamiento': album.fecha_lanzamiento,
        'cant_canciones': album.cant_canciones,
        'duracion': album.duracion,
        'estado': 'Activo'
    });
    nuevo_album.save((err, album_db) => {
        if (err) {
            res.json({
                'msj': 'El album ya existe',
                err
            })
        } else {
            res.json({
                'msj': 'El álbum se registro correctamente',
                album_db
            })
        }
    });
});

router.post('/agregar-cancion-album', (req, res) => {
    let album_id = JSON.parse(req.body.album_id);
    let cancion = JSON.parse(req.body.cancion);
    let error;

    cancion.forEach(obj_cancion => {
        Album.updateOne({ _id: album_id }, {
                $push: {
                    'canciones': {
                        nombre: obj_cancion.nombre,
                        duracion: obj_cancion.duracion,
                        artista: obj_cancion.artista,
                        album: obj_cancion.album,
                        estado: obj_cancion.estado,
                    }
                }
            },
            (error) => {
                if (error) {
                    error = error
                }
            }
        )
    });
    if (error) {
        res.json({
            'mjs': 'No se pudieron agregar las canciones'
        })
    } else {
        res.json({
            'mjs': 'Se agregaron las canciones'
        })
    }

});

router.get('/listar-albumes', (req, res) => {
    Album.find((err, coleccion_albumes) => {
        if (err) {
            res.json({
                'msj': 'No se pudo listar los albumes',
                err
            })
        } else {
            res.json({
                'msj': 'Los albumes se listaron correctamente',
                coleccion_albumes
            })
        }
    });
});

router.post('/actualizar-estado-album', (req, res) => {
    let album = JSON.parse(req.body.album);

    Album.findOneAndUpdate({ _id: album._id }, { estado: album.estado }, (err, coleccion_album) => {
        if (err) {
            res.json({
                'msj': 'No se encontro el album',
                err
            })
        } else {
            if (coleccion_album) {
                res.json({
                    coleccion_album
                })
            } else {
                res.json({
                    'msj': 'No se actualizo'
                });
            }
        }
    });
});

router.put('/modificar-album', (req, res) => {
    let album = JSON.parse(req.body.album);
    console.log(album)

    Album.updateOne({ _id: album._id }, {
        $set: {
            'codigo': album.codigo,
            'nombre': album.nombre,
            'fecha_lanzamiento': album.fecha_lanzamiento,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el album',
                err
            });
        } else {
            res.json({
                info
            });
        }
    });

});

router.get('/eliminar-album-id', (req, res) => {
    Album.findOneAndDelete({ _id: req.query._id }, (err, coleccion_albumes) => {
        if (err) {
            res.json({
                'msj': 'No se encontro el Album',
                err
            })
        } else {
            if (coleccion_albumes) {
                res.json({
                    'msj': 'El album se elimino correctamente',
                    coleccion_albumes
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