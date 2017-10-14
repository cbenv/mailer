import * as http from 'http';
import * as express from 'express'
import * as bodyParser from 'body-parser';
import * as nodemailer from 'nodemailer';

import router from './server/router';

class App 
{
  private setupVariables = function()
  {
    const config = require('../config.json');
    this.host = config.node.host;
    this.port = config.node.port;
    this.smtp = config.mail.smtp;
  }
  private configureServer = function() 
  {
    const app = express();
    const transport = nodemailer.createTransport(this.smtp);

    app.use(express.static(__dirname + '/client'));
    app.use(bodyParser.json());
    app.use('/', router(transport));

    this.http = http.createServer(app);
  }
  public initialize = function() 
  {
    this.setupVariables();
    this.configureServer();
  }
  public start = function()
  {
    this.http.listen(this.port, this.host);
    console.log(`Application is running at ${this.host}:${this.port}`);
  }
}

var app = new App();
app.initialize();
app.start();