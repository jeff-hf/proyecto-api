'use strict';

const mongoose = require('mongoose');
const schema_lista = new mongoose.Schema({
    'nombre': { type: String, required: true, unique: true },
    'canciones': { type: Array, required: false, unique: false },
});

module.exports = mongoose.model('Lista_rep', schema_lista, 'Lista_rep');