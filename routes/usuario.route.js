'use strict';

const express = require('express');
const Usuario = require('../models/usuario.model');
const Admin = require('../models/admin.model');
const router = new express.Router();

router.post('/registrar-usuario', (req, res) => {
    let usuario = JSON.parse(req.body.usuario);

    let nuevo_usuario = new Usuario({
        'nombre': usuario.nombre,
        'correo': usuario.correo,
        'fecha_nacimiento': usuario.fecha_nacimiento,
        'genero': usuario.genero,
        'tipo_usuario': usuario.tipo,
        'contrasenna': usuario.contrasenna,
        'estado': 'Activo',
    });
    nuevo_usuario.save((err, usuario_db) => {
        if (err) {
            res.json({
                msj: 'No se pudo registrar el usuario',
                err
            })
        } else {
            res.json({
                msj: 'El usuario se registro correctamente',
            })
        }
    });
});

router.get('/listar-usuarios', (req, res) => {
    Usuario.find((err, usuario_db) => {
        if (err) {
            res.json({
                'msj': 'No se pudo listar los usuarios',
                err
            })
        } else {
            res.json({
                usuario_db
            })
        }
    });
});

router.get('/listar-listas', (req, res) => {
    Usuario.findOne({ _id: req.query._id }, (err, usuario_db) => {
        if (err) {
            res.json({
                'msj': 'No se pudo listar los usuarios',
                err
            })
        } else {
            res.json({
                usuario_db
            })
        }
    });
});

router.post('/actualizar-estado-usuario', (req, res) => {
    let usuario = JSON.parse(req.body.usuario);

    Usuario.findOneAndUpdate({ _id: usuario._id }, { estado: usuario.estado }, (err, usuario_db) => {
        if (err) {
            res.json({
                'msj': 'No se encontro el usuario',
                err
            })
        } else {
            if (usuario_db) {
                res.json({
                    usuario_db
                })
            } else {
                res.json({
                    'msj': 'No se actualizo'
                });
            }
        }
    });
});

router.get('/eliminar-usuario-id', (req, res) => {
    Usuario.findOneAndDelete({ _id: req.query._id }, (err, usuario_db) => {
        if (err) {
            res.json({
                'msj': 'No se encontro el usuario',
                err
            })
        } else {
            if (usuario_db) {
                res.json({
                    usuario_db
                })
            } else {
                res.json({
                    'msj': 'No se elimino'
                });
            }
        }
    });
});

router.get('/iniciar-sesion', (req, res) => {
    Usuario.findOne({ correo: req.query.correo }, (err, usuario) => {
        if (err) {
            res.json({
                'msj': 'No se encontro el usuario',
                err
            })
        } else {
            if (usuario) {
                res.json({
                    'msj': 'El usuariose encontro correctamente',
                    usuario
                })
            } else {
                res.json({
                    'msj': 'No se encontro'
                });
            }
        }
    });
});

router.get('/iniciar-sesion-admin', (req, res) => {
    Admin.findOne({ nombre: req.query.nombre }, (err, admin) => {
        if (err) {
            res.json({
                'msj': 'No se encontro el usuario',
                err
            })
        } else {
            if (admin) {
                res.json({
                    'msj': 'El usuariose encontro correctamente',
                    admin
                })
            } else {
                res.json({
                    'msj': 'No se encontro'
                });
            }
        }
    });
});

router.put('/modificar-usuario', (req, res) => {
    let usuario = JSON.parse(req.body.usuario);

    Usuario.updateOne({ _id: usuario._id }, {
        $set: {
            'nombre': usuario.nombre,
            'correo': usuario.correo,
            'fecha_nacimiento': usuario.fecha_nacimiento,
            'genero': usuario.genero,
            'tipo_usuario': usuario.tipo,
            'contrasenna': usuario.contrasenna,
            'estado': usuario.estado
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el usuario',
                err
            });
        } else {
            res.json({
                info
            });
        }
    });

});

router.post('/agregar-lista-usuario', (req, res) => {
    let usuario_id = JSON.parse(req.body.usuario_id);
    let obj_lista = JSON.parse(req.body.obj_lista);

    Usuario.updateOne({ _id: usuario_id }, {
            $push: {
                'lista_reproduccion': {
                    'nombre': obj_lista.nombre,
                }
            }
        },
        (error) => {
            if (error) {
                return res.json({
                    success: false,
                    msj: 'No se pudo agregar la lista',
                    error
                });
            } else {
                return res.json({
                    success: true,
                    msj: 'Se agregó correctamente la lista'
                });
            }
        }
    )
});

router.put('/agregar-cancion-lista', (req, res) => {
    let usuario = JSON.parse(req.body.usuario);
    let lista = JSON.parse(req.body.lista);
    Usuario.updateOne({ _id: usuario._id }, {
        $set: {
            'lista_reproduccion': lista,
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el usuario',
                err
            });
        } else {
            res.json({
                info
            });
        }
    });
});

router.put('/agregar-favoritos', (req, res) => {
    let usuario = JSON.parse(req.body.usuario);
    let cancion = JSON.parse(req.body.cancion);

    Usuario.updateOne({ _id: usuario }, {
        $push: {
            lista_fav: cancion
        }
    }, (err, info) => {
        if (err) {
            res.json({
                msj: 'No se pudo modificar el usuario',
                err
            });
        } else {
            res.json({
                info
            });
        }
    });
});

module.exports = router;