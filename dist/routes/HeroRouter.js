"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Hero_1 = require("../models/Hero");
const Heroes = require('../data');
class HeroRouter {
    //inicializa HeroRouter
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    //obtener todos los heroes
    getAll(req, res, next) {
        console.log('en getAll ...');
        Hero_1.default.find((err, heros) => {
            if (err) {
                res.status(500).json({ err });
            }
            res.status(200).jsonp({ heros });
        });
        // User.find()
        // .then((data) => {
        //   res.status(200).json({ data });
        // })
        // .catch((error) => {
        //   res.status(500).json({ error });
        // })
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
