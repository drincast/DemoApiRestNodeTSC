"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
//crea y configura un servidor web espressjs
class App {
    //ejecuta los metodos de configuración sobre la instancia de express
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
    }
    //configura el middleware express
    middleware() {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
    // configuracion de endpoints
    routes() {
        let router = express.Router();
        router.get('/', (req, res, next) => {
            res.json({
                message: 'api rest node con typescript'
            });
        });
        this.express.use('/', router);
    }
}
exports.default = new App().express;
