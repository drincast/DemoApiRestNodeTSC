import {Router, Request, Response, NextFunction} from 'express';
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
    res.send(Heroes);
  }

  //toma cada manejador y lo atacha a un Express.Router enpoint
  init(){
    this.router.get('/', this.getAll);
  }
}

const heroRoutes = new HeroRouter();
heroRoutes.init();

export default heroRoutes.router;
