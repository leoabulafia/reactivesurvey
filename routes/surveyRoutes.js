const mongoose = require('mongoose');
const orderBy = require('lodash/orderBy');
const requireLogin = require('../middlewares/requireLogin');
const sgMail = require('@sendgrid/mail');
const keys = require('../config/keys');
const { URL } = require('url');
const Path = require('path-parser');
const shortid = require('shortid');
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
	app.get(
		'/api/:emailKey/:questionId/:choiceId/:surveyKey/:surveyTitle',
		(req, res) => {
			console.log('PARAMS', req.params);
			const {
				surveyKey,
				surveyTitle,
				emailKey,
				choiceId,
				questionId
			} = req.params;
			Survey.findOne({ surveykey: surveyKey }, (err, survey) => {
				let questions = survey.questions;
				let recipients = survey.recipients;
				let filteredRecipient = recipients.filter(
					el => el.emailKey === emailKey
				);
				let filteredResponded = filteredRecipient[0].responded.filter(
					el => el === questionId
				);
				console.log('filteredRecipient', filteredRecipient);
				console.log('filteredResponded', filteredResponded);
				let filteredQuestion = questions.filter(el => el.selected === true);
				console.log('filteredQuestion', filteredQuestion);
				if (filteredRecipient.length > 0 && filteredResponded.length === 0) {
					filteredRecipient[0].responded.push(questionId);
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
			res.redirect(`/survey/${emailKey}/${surveyKey}/${surveyTitle}`);
		}
	);

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
		Survey.findOne({ _id: surveyid }, (err, survey) => {
			survey.questions.push(questionElem);
			survey.save(err => {
				if (err) {
					console.error(err);
				}
			});
			res.send(survey.questions);
		});
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
		Survey.findOne({ _id: surveyid }, (err, survey) => {
			let filteredQuestion = survey.questions.filter(
				q => q._id.toString() === questionid
			);
			filteredQuestion[0].choices.push(choiceObj);
			survey.save(err => {
				if (err) {
					console.error(err);
				}
			});
			res.send(survey.questions);
		});
	});

	//if chosen, increments by 1 elected field in a choice
	app.post('/api/elect', (req, res) => {
		const { id, questionId, emailKey, surveyid } = req.body;
		Survey.findOne({ _id: surveyid }, (err, survey) => {
			//This is the question containing the choice
			let filteredQuestion = survey.questions.filter(
				q => q._id.toString() === questionId
			);
			//Checks if email exists in recipients
			let filteredRecipient = survey.recipients.filter(
				r => r.emailKey === emailKey
			);
			//Checks in recipients.responded array, if there's a key with the
			//question
			try {
				var filteredResponded = filteredRecipient[0].responded.filter(
					el => el === questionId
				);
			} catch (e) {}

			//If email exists and questionId is not in responded array, it means that
			//question is not yet replied, so:
			if (filteredRecipient.length > 0 && filteredResponded.length === 0) {
				//pushes questionId in responded array to later verification and,
				filteredRecipient[0].responded.push(questionId);
				//for every choice that matches with id, increments by one elected.
				for (let i = 0; i < filteredQuestion[0].choices.length; i++) {
					if (filteredQuestion[0].choices[i]._id.toString() === id) {
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
		res.send({});
	});

	//if chosen, increments by 1 multiple elected fields in a choice
	app.post('/api/multiplechoice', (req, res) => {
		const { selectedChoices, questionId, emailKey, surveyId } = req.body;
		Survey.findOne({ _id: surveyId }, (err, survey) => {
			//selected choices filtered
			let filteredSelected = funcFilter(selectedChoices);
			//This is the question containing the choice
			let filteredQuestion = survey.questions.filter(
				q => q._id.toString() === questionId
			);
			//Checks if email exists in recipients
			let filteredRecipient = survey.recipients.filter(
				r => r.emailKey === emailKey
			);
			//Checks if there's a key with the
			//question in recipients.responded array
			try {
				var filteredResponded = filteredRecipient[0].responded.filter(
					el => el === questionId
				);
			} catch (e) {}

			if (filteredRecipient.length > 0 && filteredResponded.length === 0) {
				filteredRecipient[0].responded.push(questionId);
				for (let i = 0; i < filteredSelected.length; i++) {
					for (let j = 0; j < filteredQuestion[0].choices.length; j++) {
						if (
							filteredQuestion[0].choices[j]._id.toString() ===
							filteredSelected[i]
						) {
							filteredQuestion[0].choices[j].elected += 1;
							filteredQuestion[0].totalResponded += 1;
						}
					}
				}
			}
			survey.save(err => {
				if (err) {
					console.error(err);
				}
			});
		});
		res.send({});
	});

	//reorder when drag n drop question cards
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

	//reoder when drag n drop choices (answers)
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

	//add email address to list of mails
	app.post('/api/addmails', (req, res) => {
		const { recipients, surveyId } = req.body;
		const emails = recipients.split(',').map(email => {
			return { email: email.trim(), emailKey: shortid.generate() };
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

	//delete email address from list
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

	//allows selecting multiple aswer options
	app.post('/api/allowmultiple', (req, res) => {
		const { questionId, surveyId } = req.body;
		console.log('allow multiple', req.body);
		Survey.findOne({ _id: surveyId }, (err, survey) => {
			let filtered = survey.questions.filter(
				q => q._id.toString() === questionId
			);
			filtered[0].multipleSelect = !filtered[0].multipleSelect;
			survey.save(err => {
				if (err) {
					console.error(err);
				}
			});
			res.send(survey);
		});
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
		console.log('body:', req.body);
		let emailString = '';
		const emailFunc = (str, i) => {
			return option(
				question[0].choices[i]._id.toString(),
				str,
				question[0]._id,
				surveyKey,
				surveyTitle,
				question[0].choices[i].choice
			);
		};
		try {
			var questionText = question[0].question;
		} catch (e) {
			res.send(false);
		}
		const emailF = payload => {
			let string = '';
			for (let i = 0; i < question[0].choices.length; i++) {
				string += emailFunc(payload, i);
			}
			return string;
		};

		try {
			sgMail.setApiKey(keys.sendGridKey);
			for (let i = 0; i < recipients.length; i++) {
				sgMail
					.send({
						to: recipients[i].email,
						from: `${emailFrom} <no-reply@mailsurveys.com>`,
						replyTo: 'no-reply@mailsurveys.com',
						subject: emailSubject,
						text: 'SurveyZilla',
						html: mainMail(
							emailF(recipients[i].emailKey),
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
			}
			res.send({});
		} catch (e) {}
	});
};

//HELPER FUNCTIONS

//filters array with choices ids and values and returns array with values === true
const funcFilter = arr => {
	let newArr = [];
	let oldArr = arr.filter(el => el.value === true);
	for (let i = 0; i < oldArr.length; i++) {
		newArr.push(oldArr[i].id);
	}
	return newArr;
};
