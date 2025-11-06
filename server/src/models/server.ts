import express, { Request, Response } from 'express';
import db from '../db/connection';
import cors from 'cors';
import router from '../routes/rutas';

class Server {
  private app: express.Application;
  private port: string;
  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3001';

    this.middlewares();
    this.listen();
    this.routes();
    this.dbconnect();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Aplicación corriendo en el puerto ${this.port}`);
    });
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('It works!');
    });
    this.app.use('/api', router);
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  async dbconnect() {
    try {
      await db.authenticate().then();
      console.log('Base de datos conectada');
    } catch {
      console.log('Error al conectarse a la base de datos');
    }
  }
}

export default Server;
