'use strict';

const express = require('express');
const http = require('http')
const bodyParser = require('body-parser');
const helmet = require("helmet");
var cors = require('cors')
const cookieParser = require("cookie-parser");

/** get the base path, then add it as a global variable. */
global.__basedir = require('path').resolve('./');

/**  error handler */
const errorHandler = require(__basedir + '/app/middleware/ErrorHandler')
const routes = require(__basedir + '/route/routes')

/** parse the dot env and get the port */
require('dotenv').config()
const { PORT, ALLOWED_ORIGIN, SESSION_SECRET, DOMAIN } = process.env;

require(__basedir + '/config/database');

const app = express();

/**parse requests of content-type - application/x-www-form-urlencoded*/
app.use(bodyParser.urlencoded({ extended: true }))

/**parse requests of content-type - application/json*/
app.use(bodyParser.json())



var whitelist = ALLOWED_ORIGIN
var corsOptions = {
    origin: whitelist,
    credentials: true,
};

app.options(cors(corsOptions));
app.use(cors(corsOptions));

//sessions is here 
app.use(helmet());


app.use(cookieParser());
// public route
app.use('/api', routes);

/** Standard error handling */
app.use(errorHandler)


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