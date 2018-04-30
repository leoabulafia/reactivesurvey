const mongoose = require('mongoose');
const orderBy = require('lodash/orderBy');
const requireLogin = require('../middlewares/requireLogin');
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
const { URL } = require('url');
const Path = require('path-parser');
const option = require('../services/generator');
const mainMail = require('../services/emailTemplates/mainMail');
const Survey = mongoose.model('Survey');

module.exports = app => {
	//fetches surveys
	app.get('/api/surveys', requireLogin, (req, res) => {
		console.log('req.user: ', req.user);
		Survey.find({ _user: req.user.id }).then(surveys => {
			console.log(surveys);
			res.send(surveys);
		});
	});

	// fetches url from mail and redirects to survey
	app.get('/api/:choiceId/:surveyKey/:surveyTitle', (req, res) => {
		const { surveyKey, surveyTitle } = req.params;
		res.redirect(`/survey/${surveyKey}/${surveyTitle}`);
	});

	//fetches individual survey
	app.post('/api/survey', requireLogin, (req, res) => {
		console.log('/API/SURVEY', req.body);
		Survey.findOne({ surveykey: req.body.id }).then(survey => {
			res.send(survey);
		});
	});

	//creates a new survey
	app.post('/api/newsurvey', requireLogin, (req, res) => {
		console.log(req.body);
		const { title, surveykey } = req.body;
		const survey = new Survey({
			title,
			surveykey,
			_user: req.user.id
		});
		try {
			survey.save();
			req.user.save().then(user => res.send(user));
		} catch (e) {}
	});

	//creates a new question
	app.post('/api/newquestion', requireLogin, (req, res) => {
		const { question, surveyid, index } = req.body;
		console.log(req.body);
		const questionElem = {
			question: question,
			index: index
		};
		Survey.findOneAndUpdate(
			{ _id: surveyid },
			{ $push: { questions: questionElem } },
			{ safe: true, upsert: true }
		).then(survey => res.send(survey));
	});

	//deletes a question (card)
	app.post('/api/deletequestion', requireLogin, (req, res) => {
		console.log(req.body);
		const { id, surveyId } = req.body;
		Survey.findOneAndUpdate(
			{ _id: surveyId },
			{ $pull: { questions: { _id: id } } },
			(err, user) => {
				if (err) {
					console.error(err);
				}
			}
		);
		res.send({});
	});

	//creates a new choice (answer)
	app.post('/api/newchoice', requireLogin, (req, res) => {
		const { choice, surveyid, questionid, index } = req.body;
		const choiceObj = {
			index: index,
			choice: choice
		};
		Survey.findOneAndUpdate(
			{
				_id: surveyid,
				questions: {
					$elemMatch: { _id: questionid }
				}
			},
			{ $addToSet: { 'questions.$.choices': choiceObj } }
		).then(survey => {
			res.send(survey);
		});
	});

	//if chosen, increments by 1 elected field in a choice
	app.post('/api/elect', (req, res) => {
		const { index, questionindex, surveyid } = req.body;
		Survey.findOne({ _id: surveyid }, (err, survey) => {
			let filtered = survey.questions.filter(q => q.index === questionindex);
			let choice = filtered[0].choices.filter(choice => choice.index === index);
			choice[0].elected += 1;
			console.log('CHOICE: ', choice);
			survey.save(err => {
				if (err) {
					console.error(err);
				}
			});
		});
		res.send({});
	});

	app.post('/api/reorderquestions', (req, res) => {
		const { questions, surveyId } = req.body;
		Survey.findOne({ _id: surveyId }, (err, survey) => {
			survey.questions = questions;
			console.log(survey.questions);
			for (let i = 0; i < survey.questions.length; i++) {
				survey.questions[i].index = i;
			}
			survey.save(err => {
				if (err) {
					console.error(err);
				}
			});
			res.send(survey);
		});
	});

	app.post('/api/reorderchoices', (req, res) => {
		console.log('BODY: ', req.body);
		const { choices, surveyId, questionId } = req.body;
		Survey.findOne({ _id: surveyId }, (err, survey) => {
			let filtered = survey.questions.filter(
				q => q._id.toString() === questionId
			);
			filtered[0].choices = choices;
			for (let i = 0; i < filtered[0].choices.length; i++) {
				filtered[0].choices[i].index = i;
			}
			survey.save(err => {
				if (err) {
					console.error(err);
				}
			});
			res.send(survey);
		});
	});

	app.post('/api/addmails', (req, res) => {
		const { recipients, surveyId } = req.body;
		const emails = recipients.split(',').map(email => {
			return { email: email.trim() };
		});
		for (let i = 0; i < emails.length; i++) {
			Survey.findOneAndUpdate(
				{ _id: surveyId },
				{ $push: { recipients: emails[i] } },
				{ safe: true, upsert: true },
				(err, user) => {
					if (err) {
						console.error(err);
					}
				}
			);
		}
		res.send({});
	});

	app.post('/api/deletemail', (req, res) => {
		const { mailId, surveyId } = req.body;

		Survey.findOneAndUpdate(
			{ _id: surveyId },
			{ $pull: { recipients: { _id: mailId } } },
			(err, user) => {
				if (err) {
					console.error(err);
				}
			}
		);
		res.send({});
	});

	//selects the questions that will appear in the email body
	app.post('/api/selectquestion', (req, res) => {
		const { questionIndex, surveyId } = req.body;
		Survey.findOne({ _id: surveyId }, (err, survey) => {
			let questions = survey.questions;
			for (let i = 0; i < questions.length; i++) {
				if (questions[i].index === questionIndex) {
					questions[i].selected = true;
				} else {
					questions[i].selected = false;
				}
				survey.save(err => {
					if (err) {
						console.error(err);
					}
				});
			}
			res.send(survey);
		});
	});

	app.post('/api/allowmultiple', (req, res) => {
		const { questionId, surveyId } = req.body;
		console.log('allow multiple', req.body);
		res.send({});
	});

	app.post('/api/sendmail', (req, res) => {
		const {
			surveyKey,
			surveyTitle,
			question,
			recipients,
			emailSubject,
			emailFrom,
			emailTitle,
			emailSubtitle,
			emailDescription
		} = req.body;
		let optionsConc = '';
		const questionText = question[0].question;
		for (let i = 0; i < question[0].choices.length; i++) {
			optionsConc = optionsConc.concat(
				option(
					question[0].choices[i]._id.toString(),
					surveyKey,
					surveyTitle,
					question[0].choices[i].choice
				)
			);
		}
		console.log('questionText: ', optionsConc);
		console.log('opt string', question[0].choices[0].choice);
		sgMail.setApiKey(keys.sendGridKey);
		sgMail
			.sendMultiple({
				to: recipients,
				from: `${emailFrom} <no-reply@mailsurveys.com>`,
				replyTo: 'no-reply@mailsurveys.com',
				subject: emailSubject,
				text: 'Testing my woooorld!',
				html: mainMail(
					optionsConc,
					emailTitle,
					emailSubtitle,
					emailDescription,
					questionText
				)
			})
			.then(res => console.log(res))
			.catch(error => {
				console.error(error.toString());
			});
		res.send({});
	});

	app.post('/', (req, res) => {
		const values = new Path('/api/:choiceId/:surveyKey/:surveyName');
		req.body.map(event => {
			const pathname = new URL(event.url).pathname;
			const { choiceId, surveyKey, surveyName } = values.test(pathname);
			const email = event.email;
			Survey.findOne({ surveykey: surveyKey }, (err, survey) => {
				let questions = survey.questions;
				let recipients = survey.recipients;
				let filteredRecipient = recipients.filter(
					el => el.email === email && el.responded === false
				);
				let filteredQuestion = questions.filter(el => el.selected === true);
				console.log('filterRecip, ', filteredRecipient);
				console.log('filterQuest, ', filteredQuestion);
				if (filteredRecipient.length > 0) {
					filteredRecipient[0].responded = true;
					for (let i = 0; i < filteredQuestion[0].choices.length; i++) {
						if (filteredQuestion[0].choices[i]._id.toString() === choiceId) {
							filteredQuestion[0].choices[i].elected += 1;
							filteredQuestion[0].totalResponded += 1;
						}
					}
				}

				survey.save(err => {
					if (err) {
						console.error(err);
					}
				});
			});
		});
		res.send({});
	});
};
