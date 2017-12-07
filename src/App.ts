import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import HeroRouter from './routes/HeroRouter';

//crea y configura un servidor web espressjs
class App{
  public express: express.Application;

  //ejecuta los metodos de configuración sobre la instancia de express
  constructor(){
    this.express = express();
    this.middleware();
    this.routes();
  }

  //configura el middleware express
  private middleware(): void{
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  // configuracion de endpoints
  private routes(): void {
    let router = express.Router();

    router.get('/', (req, res, next) => {
      res.json({
        message: 'api rest node con typescript'
      });
    });

    this.express.use('/', router);
    this.express.use('/api/v1/heroes', HeroRouter)
  }
}

export default new App().express;
