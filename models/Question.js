const mongoose = require('mongoose');
const { Schema } = mongoose;
const ChoiceSchema = require('./Choice');

const questionSchema = new Schema({
	question: String,
	index: Number,
	choices: [ChoiceSchema],
	totalResponded: { type: Number, default: 0 },
	selected: { type: Boolean, default: false },
	multipleSelect: { type: Boolean, default: false }
});

module.exports = questionSchema;
