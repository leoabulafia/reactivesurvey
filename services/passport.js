const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
const confirmEmail = require('../services/emailTemplates/confirmEmail');
const recoveryEmail = require('../services/emailTemplates/recoveryEmail');
const randomstring = require('randomstring');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const ResetPassword = mongoose.model('ResetPassword');

//user.id is MONGO id
//generate a token to set inside the cookie
passport.serializeUser((user, done) => {
	console.log('serializeUser', user.id);
	done(null, user.id);
});

//passport takes token and turn it into a user mongoose model class
passport.deserializeUser((id, done) => {
	console.log('deserializeUser', id);
	User.findById(id).then(user => done(null, user));
});

//google oauth
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: '/auth/google/callback',
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleId: profile.id }).then(userExists => {
				if (userExists) {
					done(null, userExists);
				} else {
					new User({ googleId: profile.id, confirmed: true })
						.save()
						.then(user => done(null, user));
				}
			});
		}
	)
);

//facebook oauth
passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookClientId,
			clientSecret: keys.facebookClientSecret,
			callbackURL: '/auth/facebook/callback',
			proxy: true
		},
		(accessToken, refreshToken, profile, cb) => {
			User.findOne({ facebookId: profile.id }).then(userExists => {
				if (userExists) {
					cb(null, userExists);
				} else {
					new User({ facebookId: profile.id, confirmed: true })
						.save()
						.then(user => cb(null, user));
				}
			});
		}
	)
);

//Local Login
passport.use(
	'local-login',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			proxy: true
		},
		(email, password, done) => {
			User.findOne({ email: email }, (err, user) => {
				if (err) {
					console.log('well thats an error');
					return done(err);
				}
				//no username or email found
				if (!user) {
					console.log('Im afraid no username or email found');
					return done(null, false);
				}
				//user found but wrong password
				if (!user.validPassword(password)) {
					console.log('user found, wrong password!');
					return done(null, false);
				}
				//all is ok!
				console.log('yes! user found!');
				return done(null, user);
			});
		}
	)
);

//Local Signup
passport.use(
	'local-signup',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			proxy: true
		},
		(email, password, done) => {
			User.findOne({ email: email }, (err, user) => {
				if (err) {
					console.log('well thats an error');
					return done(err);
				}
				if (user) {
					console.log('we found a user with the same name!');
					return done(null, false);
				} else {
					const newUser = new User();
					let tokenToHash = randomstring.generate({ length: 64 });
					newUser.email = email;
					newUser.confirmPasswordToken = newUser.generateHash(tokenToHash);
					newUser.password = newUser.generateHash(password);
					//save!
					newUser.save(err => {
						if (err) {
							throw err;
						}
						console.log('user created');
						sgMail.setApiKey(keys.sendGridKey);
						sgMail
							.send({
								to: email,
								from: 'Mail Surveys <no-reply@mailsurveys.com>',
								replyTo: 'no-reply@mailsurveys.com',
								subject: 'Confirm your Account',
								text: 'Testing my woooorld!',
								html: confirmEmail(tokenToHash)
							})
							.then(() => console.log('sent!'))
							.catch(error => {
								console.error(error.toString());
							});
						return done(null, newUser);
					});
				}
			});
		}
	)
);

//recover password check
passport.use(
	'local-recover',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'email',
			passReqToCallback: true,
			proxy: true
		},
		(req, email, password, done) => {
			User.findOne({ email: email }, (err, user) => {
				if (err) {
					console.log('well thats an error');
					return done(err);
				}
				//no username or email found
				if (!user) {
					console.log('That email is not registered');
					return done(null, false);
				} else {
					let tokenToHash = randomstring.generate({ length: 64 });
					const newPasswordReset = new ResetPassword();
					newPasswordReset.resetToken = tokenToHash;
					newPasswordReset.save(err => {
						if (err) {
							throw err;
						}
					});
					//save!
					user.save(err => {
						if (err) {
							throw err;
						}
						console.log('recovery email sent');
						sgMail.setApiKey(keys.sendGridKey);
						sgMail
							.send({
								to: email,
								from: 'Mail Surveys <no-reply@mailsurveys.com>',
								replyTo: 'no-reply@mailsurveys.com',
								subject: 'Reset Your Password',
								text: 'Reset your Password',
								html: recoveryEmail(tokenToHash)
							})
							.then(() => console.log('sent!'))
							.catch(error => {
								console.error(error.toString());
							});
						return done(null, user);
					});
				}
			});
		}
	)
);
