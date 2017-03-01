'use strict';

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const listSchema = Schema({
  name: { type: String, required: true },
  timestamp: { type: Data, required: true }
});

module.exports = mongoose.model('list', listSchema);
