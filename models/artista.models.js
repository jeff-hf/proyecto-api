'use strict';

const mongoose = require('mongoose');
const schema_artista = new mongoose.Schema({
    'nombre': { type: String, required: true, unique: true },
    'casa_disquera': { type: String, required: true, unique: false },
    'fecha_nacimiento': { type: Date, required: true, unique: false },
    'edad': { type: Number, required: true, unique: false },
    'albumes': [{
        'codigo': { type: String, required: true, unique: true },
        'nombre': { type: String, required: true, unique: false },
        'fecha_lanzamiento': { type: Date, required: true, unique: false },
        'canciones': { type: Array, required: false, unique: false },
        'cant_canciones': { type: Number, required: true, unique: false },
        'duracion': { type: Number, required: true, unique: false },
        'estado': { type: String, require: true, unique: false },
    }],
    'estado': { type: String, require: true, unique: false },
});

module.exports = mongoose.model('Artistas', schema_artista, 'artistas');