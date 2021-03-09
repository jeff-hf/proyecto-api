'use strict';

const mongoose = require('mongoose');
const schema_usuario = new mongoose.Schema({
    'nombre': { type: String, required: true, unique: false },
    'correo': { type: String, required: true, unique: true },
    'fecha_nacimiento': { type: Date, required: true, unique: false },
    'genero': { type: String, required: true, unique: false },
    'tipo_usuario': { type: String, required: true, unique: false },
    'contrasenna': { type: String, required: true, unique: false },
    'lista_reproduccion': [{
        'nombre': { type: String, required: true, unique: true },
        'canciones': [{
            nombre: { type: String, required: true, unique: false },
            artista: { type: Array, required: true, unique: false },
            duracion: { type: Number, required: true, unique: false },
        }],
    }],
    'lista_fav': { type: Array, required: false, unique: true },
    'estado': { type: String, required: true, unique: false },
});

module.exports = mongoose.model('Usuarios', schema_usuario, 'usuarios');