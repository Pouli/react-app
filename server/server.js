'use strict';

const path = require('path');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('../webpack.config.dev.js');

const database = require('./utils/database');

const logError = require('./error-handler/log-error');
const clientErrorHandler = require('./error-handler/client-error-handler');
const errorHandler = require('./error-handler/error-handler');

let app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

if(process.env.NODE_ENV === 'dev') {
    const compiler = webpack(webpackDevConfig);

    const devServer = devMiddleware(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        quiet: false,
        stats: {
            colors: true
        }
    });
    const hotServer = hotMiddleware(compiler);

    app.use(devServer);
    app.use(hotServer);
}
else {
    app.use(express.static(path.join(__dirname, '../dist')));
}

app.use('/user', require('./user/user.route'));

app.use(logError);
app.use(clientErrorHandler);
app.use(errorHandler);

database.connect()
    .then(() => app.emit('app_ready'))
    .catch((err) => app.emit('app_err', err));

module.exports = app;