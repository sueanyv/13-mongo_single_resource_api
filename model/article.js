'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = Schema({
  title: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('article', articleSchema);
