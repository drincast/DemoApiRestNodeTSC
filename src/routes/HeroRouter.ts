import {Router, Request, Response, NextFunction} from 'express';
const Heroes = require('../Data/data');

export class HeroRouter{
  router: Router

  //inicializa HeroRouter
  constructor(){
    this.router = Router();
    this.init();
  }

  //obtener todos los heroes
  public getAll(req: Request, res: Response, next: NextFunction){
    res.send(Heroes);
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
