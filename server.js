'use strict';


const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Promise = require('bluebird');
const mongoose = require('mongoose');
const debug = require('debug')('blog:server');
const articleRouter = require('./route/article-route.js');
const error = require('error-middleware.js');
const app = express();

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/listdev';

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.use(cors());
app.use(morgan('dev'));
app.use(articleRouter);

app.listen(PORT, function() {
  console.log(`server up: ${PORT}`);
});
