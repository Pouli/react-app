'use strict';

const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const database = require('./utils/database');

const logError = require('./error-handler/log-error');
const clientErrorHandler = require('./error-handler/client-error-handler');
const errorHandler = require('./error-handler/error-handler');

let app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

app.use(express.static(path.join(__dirname, '../src')));

app.use('/user', require('./user/user.route'));

app.use(logError);
app.use(clientErrorHandler);
app.use(errorHandler);

database.connect()
    .then(() => app.emit('app_ready'))
    .catch((err) => app.emit('app_err', err));

module.exports = app;