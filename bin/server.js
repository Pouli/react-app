'use strict';

const http = require('http');

const app = require('../server/server');


app.on('app_ready', () => {
    const server = http.createServer(app);

    server.listen(process.env.PORT || 3000);
});

app.on('app_error', (err) => console.error(err));