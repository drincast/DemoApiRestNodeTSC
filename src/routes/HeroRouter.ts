import {Router, Request, Response, NextFunction} from 'express';
import mongoose = require('mongoose');
import Hero from '../models/Hero';

const Heroes = require('../data');

export class HeroRouter{
  router: Router

  //inicializa HeroRouter
  constructor(){
    this.router = Router();
    this.init();
  }

  //obtener todos los heroes
  public getAll(req: Request, res: Response, next: NextFunction){
    console.log('en getAll ...');
    Hero.find((err, heros) => {
      if(err){
        res.status(500).json({err});
      }
      res.status(200).jsonp({heros});
    });

    // User.find()
    // .then((data) => {
    //   res.status(200).json({ data });
    // })
    // .catch((error) => {
    //   res.status(500).json({ error });
    // })
  }

  public getOne(req: Request, res: Response, next: NextFunction){
    let query = parseInt(req.params.id);
    let hero = Heroes.find(hero => hero.id === query);
    if(hero){
      res.status(200)
        .send({
          message: 'success',
          status: res.status,
          hero
        });
    }
    else{
      res.status(404)
        .send({
          message: 'No hero found with the id.',
          status: res.status
        });
    }
  }

  //toma cada manejador y lo atacha a un Express.Router enpoint
  init(){
    this.router.get('/', this.getAll)
    this.router.get('/:id', this.getOne);
  }
}

const heroRoutes = new HeroRouter();
heroRoutes.init();

export default heroRoutes.router;
