'use strict';

const express = require('express');
const Artista = require('../models/artista.models');
const router = new express.Router();

router.post('/registrar-artista', (req, res) => {
    let artista = JSON.parse(req.body.artista);

    let nuevo_artista = new Artista({
        'nombre': artista.nombre,
        'casa_disquera': artista.casa_disquera,
        'fecha_nacimiento': artista.fecha_nacimiento,
        'edad': artista.edad,
        'estado': 'Activo'
    });
    nuevo_artista.save((err, artista_db) => {
        if (err) {
            res.json({
                success: false,
                'msj': 'No se pudo registrar el artista',
                err
            })
        } else {
            res.json({
                success: true,
                'msj': 'El artista se registro correctamente',
            })
        }
    });
});

router.get('/listar-artistas', (req, res) => {
    Artista.find((err, coleccion_artistas) => {
        if (err) {
            res.json({
                'msj': 'No se pudo listar los artistas',
                err
            })
        } else {
            res.json({
                'msj': 'Los artistas se listaron correctamente',
                coleccion_artistas
            })
        }
    });
});

router.post('/actualizar-estado-artista', (req, res) => {
    let artista = JSON.parse(req.body.artista);

    Artista.findOneAndUpdate({ _id: artista._id }, { estado: artista.estado }, (err, coleccion_artista) => {
        if (err) {
            res.json({
                'msj': 'No se encontro el artista',
                err
            })
        } else {
            if (coleccion_artista) {
                res.json({
                    coleccion_artista
                })
            } else {
                res.json({
                    'msj': 'No se actualizo'
                });
            }
        }
    });
});

router.post('/agregar-album-artista', (req, res) => {
    let artista_id = JSON.parse(req.body.artista_id);
    let album = JSON.parse(req.body.album);

    if (artista_id) {
        Artista.updateOne({ _id: artista_id }, {
                $push: {
                    'albumes': {
                        codigo: album.codigo,
                        nombre: album.nombre,
                        fecha_lanzamiento: album.fecha_lanzamiento,
                        canciones: album.canciones,
                        cant_canciones: album.cant_canciones,
                        duracion: album.duracion,
                        estado: album.estado,
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

router.put('/modificar-artista', (req, res) => {
    let artista = JSON.parse(req.body.artista);

    Artista.updateOne({ _id: artista._id }, {
        $set: {
            'nombre': artista.nombre,
            'casa_disquera': artista.casa_disquera,
            'fecha_nacimiento': artista.fecha_nacimiento,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el artista',
                err
            });
        } else {
            res.json({
                info
            });
        }
    });

});

router.get('/eliminar-artista-id', (req, res) => {
    Artista.findOneAndDelete({ _id: req.query._id }, (err, coleccion_artistas) => {
        if (err) {
            res.json({
                'msj': 'No se encontro el artista',
                err
            })
        } else {
            if (coleccion_artistas) {
                res.json({
                    coleccion_artistas
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