const mongoose = require('mongoose');
const { Schema } = mongoose;
const QuestionSchema = require('./Question');
const RecipientSchema = require('./Recipient');

// _user property means that every survey belongs
// to every particular user
const surveySchema = new Schema({
	title: String,
	surveykey: String,
	questions: [QuestionSchema],
	recipients: [RecipientSchema],
	_user: { type: Schema.Types.ObjectId, ref: 'User' }
});

mongoose.model('Survey', surveySchema);
