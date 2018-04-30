const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
const confirmEmail = require('./emailTemplates/confirmEmail');

sgMail.setApiKey(keys.sendGridKey);

const msg = {
  to: 'ldavalos.mail@gmail.com',
  from: 'no-reply@mailsurveys.com',
  subject: 'Test my world!',
  text: 'Testing my woooorld!',
  html: confirmEmail()
};

module.exports = msg;
