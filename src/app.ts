import * as http from 'http';
import * as express from 'express'
import * as bodyParser from 'body-parser';
import * as nodemailer from 'nodemailer';

import router from './server/router';

class App {
  private config;
  private http;

  constructor() {
    this.config = require('../config.json');
  }

  private configureServer() {
    const app = express();
    const transport = nodemailer.createTransport(this.config.mail.smtp);
    app.use(express.static(__dirname + '/client'));
    app.use(bodyParser.json());
    app.use('/', router(transport));
    this.http = http.createServer(app);
  }

  public start() {
    const port = this.config.node.port;
    const host = this.config.node.host;
    this.configureServer();
    this.http.listen(port, host);
    console.log(`Application is running at ${host}:${port}`);
  }
}

var app = new App();
app.start();