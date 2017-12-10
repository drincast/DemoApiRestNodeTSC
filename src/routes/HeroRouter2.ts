import {Router, Request, Response, NextFunction} from 'express';
import mongoose = require('mongoose');
import Hero from '../models/Hero';
import Promise = require('mongoose-promise');

export class HeroRouter2{
  router: Router

  //inicializa HeroRouter
  constructor(){
    this.router = Router();
    this.init();
  }

  /*obtener todos los heroes*/
  public getAll(req: Request, res: Response, next: NextFunction){
    console.log('en getAll ...');
    mongoose.Promise = require('q').Promise;
    Hero.find().exec()
    .then((heros) => {
      res.status(200).json({ heros })
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
  }

  public getOne(req: Request, res: Response, next: NextFunction){
    //let query = parseInt(req.params.id);
    let query = req.params.id;
    mongoose.Promise = require('q').Promise;
    Hero.findById(query).exec()
      .then((hero) => {
        console.log('GET /herores2/' + req.params.id);
        res.status(200).json(hero);
      })
      .catch((error) => {
        res.status(500).send({ error });
      });
  }

  public getByName(req: Request, res: Response, next: NextFunction){
    let query = {'name': req.params.name};
    mongoose.Promise = require('q').Promise;
    Hero.findOne(query).exec()
      .then((hero) => {
        console.log('GET /herores2/name/' + req.params.name);
        res.status(200).json(hero);
      })
      .catch((error) => {
        res.status(500).send({ error });
      });
  }

  public updateOne(req: Request, res: Response, next: NextFunction){
    let query = req.params.id;
    Hero.findById(query, (err, hero) => {
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

  public insertOne(req: Request, res: Response, next: NextFunction){
    let hero = new Hero({
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

  public deleteOne(req: Request, res: Response, next: NextFunction){
    //let query = parseInt(req.params.id);
    let query = req.params.id;
    console.log('DELETE /herores2/' + req.params.id);
    mongoose.Promise = require('q').Promise;
    Hero.findById(query).exec()
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
  init(){
    this.router.get('/', this.getAll)
    this.router.get('/:id', this.getOne);
    //this.router.get('/name/:name', this.getByName);
    this.router.put('/:id', this.updateOne);
    this.router.post('/', this.insertOne);
    this.router.delete('/:id', this.deleteOne);
  }
}

const heroRoutes2 = new HeroRouter2();
heroRoutes2.init();

export default heroRoutes2.router;
