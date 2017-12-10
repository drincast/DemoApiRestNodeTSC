"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const HeroRouter_1 = require("./routes/HeroRouter");
const HeroRouter2_1 = require("./routes/HeroRouter2");
//crea y configura un servidor web espressjs
class App {
    //ejecuta los metodos de configuración sobre la instancia de express
    constructor() {
        this.express = express();
        this.middleware();
        this.routes();
        this.configDB();
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
        this.express.use('/api/v1/heroes', HeroRouter_1.default);
        this.express.use('/api/v1/heroes2', HeroRouter2_1.default);
    }
    //configuracion de base de datos.
    configDB() {
        console.log('iniciando conexión ...');
        const MONGODB_CONNECTION = "mongodb://localhost:27017/heros";
        mongoose.connect(MONGODB_CONNECTION, { useMongoClient: true, });
    }
}
exports.default = new App().express;
