import express from "express";
import logger from "morgan";
import cors from "cors";
import http from "http";

import indexRouter from "./routes/weather";
import usersRouter from "./routes/favorites";

import config from "./config"

const main = () =>
    configureServer(
        configureApp()
    );

const configureApp = () =>
    express()
        .use(logger('dev'))
        .use(express.json())
        .use(express.urlencoded({extended: false}))
        .use(cors())
        .set('port', config.server.port)
        .use('/weather', indexRouter())
        .use('/favorites', usersRouter());

const configureServer = (app) =>
    http.createServer(app)
        .listen(config.server.port)
        .on('error', (error) => {
            throw error
        })
        .on(
            'listening',
            () => console.log('Server is listening on port ' + config.server.port)
        );

main();
