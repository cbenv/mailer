import * as http from 'http';
import * as express from 'express'
import * as bodyParser from 'body-parser';

import router from './server/router';

class App {
  private config;
  private httpServer;

  constructor() {
    this.config = require('../config/development.json');
  }

  private configureServer() {
    const app = express();
    app.set('config', this.config);
    app.use(express.static(__dirname + '/client'));
    app.use(bodyParser.json());
    app.use('/', router());
    this.httpServer = http.createServer(app);
  }

  public start() {
    const {host, port} = this.config.node;
    this.configureServer();
    this.httpServer.listen(port, host);
    console.log(`Application is running at ${host}:${port}`);
  }
}

const app = new App();
app.start();