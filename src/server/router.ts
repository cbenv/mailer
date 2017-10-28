import * as _ from 'lodash';
import * as express from 'express';
import * as nodemailer from 'nodemailer';

export default () => {

  const router = express.Router();

  router.post('/email', (req, res) => {
    const config = req.app.get('config');
    const transport = nodemailer.createTransport(config.mail.smtp);
    const payload = req.body;
    const requiredFields = ['from', 'to', 'subject', 'text'];
    const missingFields = _.reject(requiredFields, (field) => _.has(payload, field));
    if (!_.isEmpty(missingFields)) {
      const error = `missing required fields: ${missingFields.join(', ')}`;
      return res.status(400).send(error);
    }
    const onSuccess = (info) => {
      return res.status(200).send(info);
    }
    const onFailure = (error) => {
      return res.status(500).send(error);
    }
    transport.sendMail(payload).then(onSuccess, onFailure);
  });

  return router;
}