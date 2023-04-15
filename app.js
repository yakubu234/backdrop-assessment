'use strict';

const express = require('express');
const http = require('http')
const bodyParser = require('body-parser');

/** get the base path, then add it as a global variable. */
global.__basedir = require('path').resolve('./');

/** parse the dot env and get the port */
require('dotenv').config()
const { PORT, ALLOWED_ORIGIN, SESSION_SECRET, DOMAIN } = process.env;

require(__basedir + '/config/database');

const app = express();

/**parse requests of content-type - application/x-www-form-urlencoded*/
app.use(bodyParser.urlencoded({ extended: true }))

/**parse requests of content-type - application/json*/
app.use(bodyParser.json())


app.get('/', (req, res) => {
    res.json({
        "name": "the backdrop task home page"
    })
});

app.post('/uuid', (req, res) => {
    req.session.clientID = req.body.uuid
    res.end()
});


/** catch all routes that are not defined and send response */
app.get('*', (req, res) => {
    res.status(404).json({
        "status": "error",
        "message": "Not Found",
        "data": null
    });
    res.end()
});

/* Connect express app and the websocket server  */
const server = http.createServer(app)

/**listen for requests */
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});