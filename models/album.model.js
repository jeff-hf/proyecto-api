'use strict';

const mongoose = require('mongoose');
const schema_album = new mongoose.Schema({
    'codigo': { type: String, required: true, unique: true },
    'nombre': { type: String, required: true, unique: false },
    'fecha_lanzamiento': { type: Date, required: true, unique: false },
    'canciones': [{
        'nombre': { type: String, required: true, unique: false },
        'duracion': { type: Number, required: true, unique: false },
        'artista': { type: Array, required: true, unique: false },
        'album': { type: Array, required: false, unique: false },
        'estado': { type: String, require: true, unique: false },
    }],
    'cant_canciones': { type: Number, required: true, unique: false },
    'duracion': { type: Number, required: true, unique: false },
    'estado': { type: String, require: true, unique: false },
});

module.exports = mongoose.model('Album', schema_album, 'album');