const regexMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default recipients => {
	const invalidRecipients = recipients
		.split(',')
		.map(recipient => recipient.trim())
		.filter(recipient => regexMail.test(recipient) === false);

	if (invalidRecipients.length) {
		return `These emails are invalid: ${invalidRecipients}`;
	}

	return;
};
