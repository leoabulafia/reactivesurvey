const mongoose = require('mongoose');
const { Schema } = mongoose;

const choiceSchema = new Schema({
	index: Number,
	choice: String,
	elected: { type: Number, default: 0 }
});

module.exports = choiceSchema;
