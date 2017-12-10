"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mongoose = require("mongoose");
const Hero_1 = require("../models/Hero");
class HeroRouter2 {
    //inicializa HeroRouter
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /*obtener todos los heroes*/
    getAll(req, res, next) {
        console.log('en getAll ...');
        mongoose.Promise = require('q').Promise;
        Hero_1.default.find().exec()
            .then((heros) => {
            res.status(200).json({ heros });
        })
            .catch((error) => {
            res.status(500).json({ error });
        });
    }
    getOne(req, res, next) {
        //let query = parseInt(req.params.id);
        let query = req.params.id;
        mongoose.Promise = require('q').Promise;
        Hero_1.default.findById(query).exec()
            .then((hero) => {
            console.log('GET /herores2/' + req.params.id);
            res.status(200).json(hero);
        })
            .catch((error) => {
            res.status(500).send({ error });
        });
    }
    getByName(req, res, next) {
        let query = { 'name': req.params.name };
        mongoose.Promise = require('q').Promise;
        Hero_1.default.findOne(query).exec()
            .then((hero) => {
            console.log('GET /herores2/name/' + req.params.name);
            res.status(200).json(hero);
        })
            .catch((error) => {
            res.status(500).send({ error });
        });
    }
    updateOne(req, res, next) {
        let query = req.params.id;
        Hero_1.default.findById(query, (err, hero) => {
            console.log('req.body.name: ' + req.body.name);
            hero["name"] = req.body.name;
            hero["aliases"] = req.body.aliases;
            hero["occupation"] = req.body.occupation;
            hero["gender"] = req.body.genrer;
            hero["height"] = req.body.height;
            hero["hair"] = req.body.hair;
            hero["eyes"] = req.body.eyes;
            hero["powers"] = req.body.powers;
            mongoose.Promise = require('q').Promise;
            hero.save()
                .then((hero) => {
                console.log('OK ...');
                res.status(200).json(hero);
            })
                .catch((error) => {
                console.log('ERROR ...');
                return res.status(500).send(error.message);
            });
        });
    }
    insertOne(req, res, next) {
        let hero = new Hero_1.default({
            name: req.body.name,
            aliases: req.body.aliases,
            occupation: req.body.occupation,
            gender: req.body.genrer,
            height: req.body.height,
            hair: req.body.hair,
            eyes: req.body.eyes,
            powers: req.body.powers
        });
        mongoose.Promise = require('q').Promise;
        hero.save()
            .then((hero) => {
            res.status(200).json(hero);
        })
            .catch((error) => {
            return res.status(500).send(error.message);
        });
    }
    deleteOne(req, res, next) {
        //let query = parseInt(req.params.id);
        let query = req.params.id;
        console.log('DELETE /herores2/' + req.params.id);
        mongoose.Promise = require('q').Promise;
        Hero_1.default.findById(query).exec()
            .then((hero) => {
            hero.remove()
                .then(() => {
                res.status(200).send({ message: 'Successfully deleted' });
            })
                .catch((error) => {
                res.status(500).send({ error });
            });
        })
            .catch((error) => {
            res.status(500).send({ error });
        });
    }
    //toma cada manejador y lo atacha a un Express.Router enpoint
    init() {
        this.router.get('/', this.getAll);
        this.router.get('/:id', this.getOne);
        //this.router.get('/name/:name', this.getByName);
        this.router.put('/:id', this.updateOne);
        this.router.post('/', this.insertOne);
        this.router.delete('/:id', this.deleteOne);
    }
}
exports.HeroRouter2 = HeroRouter2;
const heroRoutes2 = new HeroRouter2();
heroRoutes2.init();
exports.default = heroRoutes2.router;
