const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
	email: String,
	emailKey: String,
	sent: { type: Boolean, default: false },
	responded: []
});

module.exports = recipientSchema;
