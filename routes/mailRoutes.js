const mongoose = require('mongoose');
const { URL } = require('url');
const Path = require('path-parser');
const requireLogin = require('../middlewares/requireLogin');
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
const confirmEmail = require('../services/emailTemplates/confirmEmail');
const recoveryEmail = require('../services/emailTemplates/recoveryEmail');

const User = mongoose.model('User');

module.exports = app => {
	app.get('/auth/confirm/:token', (req, res) => {
		res.redirect('/emailconfirmed');
	});

	app.get('/auth/resetpassword', (req, res) => {
		res.redirect('/resetpassword');
	});

	// app.post('/', (req, res) => {
	//   req.body.map(event => {
	//     const pathname = new URL(event.url).pathname;
	//     const p = new Path('/auth/confirm/:token');
	//     const { token } = p.test(pathname);
	//     const emailToConfirm = event.email;
	//     console.log('Token: ', token);
	//     console.log('Email: ', emailToConfirm);
	//     User.findOne({ email: emailToConfirm, confirmed: false }, (err, user) => {
	//       if (user.validToken(token)) {
	//         console.log('confirmed!');
	//         user.confirmed = true;
	//         user.save(err => {
	//           if (err) {
	//             console.error(err);
	//           }
	//         });
	//       }
	//     });
	//   });
	//   res.send({});
	// });

	app.post('/auth/resetpassword', (req, res) => {
		const email = req.user.email;
		sgMail.setApiKey(keys.sendGridKey);
		sgMail
			.send({
				to: email,
				from: 'Mail Surveys <no-reply@mailsurveys.com>',
				replyTo: 'no-reply@mailsurveys.com',
				subject: 'Test my world!',
				text: 'Testing my woooorld!',
				html: recoveryEmail()
			})
			.then(res => console.log(res))
			.catch(error => {
				console.error(error.toString());
			});
		res.send(req.user);
	});
};
