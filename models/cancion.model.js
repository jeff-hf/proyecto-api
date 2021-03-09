'use strict';

const mongoose = require('mongoose');
const schema_cancion = new mongoose.Schema({
    'nombre': { type: String, required: true, unique: false },
    'duracion': { type: Number, required: true, unique: false },
    'artista': [{
        'nombre': { type: String, required: true, unique: false },
        'casa_disquera': { type: String, required: true, unique: false },
        'fecha_nacimiento': { type: Date, required: true, unique: false },
        'edad': { type: Number, required: true, unique: false },
        'estado': { type: String, require: true, unique: false },
    }],
    'album': { type: Array, required: false, unique: false },
    'estado': { type: String, require: true, unique: false },
});

module.exports = mongoose.model('Cancion', schema_cancion, 'cancion');