"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Heroes = require('../data');
class HeroRouter {
    //inicializa HeroRouter
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    //obtener todos los heroes
    getAll(req, res, next) {
        res.send(Heroes);
    }
    getOne(req, res, next) {
        let query = parseInt(req.params.id);
        let hero = Heroes.find(hero => hero.id === query);
        if (hero) {
            res.status(200)
                .send({
                message: 'success',
                status: res.status,
                hero
            });
        }
        else {
            res.status(404)
                .send({
                message: 'No hero found with the id.',
                status: res.status
            });
        }
    }
    //toma cada manejador y lo atacha a un Express.Router enpoint
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
    }
}
exports.HeroRouter = HeroRouter;
const heroRoutes = new HeroRouter();
heroRoutes.init();
exports.default = heroRoutes.router;
