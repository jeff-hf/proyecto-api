'use strict';

const mongoose = require('mongoose');
const schema_admin = new mongoose.Schema({
    'nombre': { type: String, required: true, unique: false },
    'contrasenna': { type: String, required: true, unique: false },
});

module.exports = mongoose.model('Admin', schema_admin, 'admin');