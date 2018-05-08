//Fields for:
//createAccountForm
//loginForm

//createAccountForm fields
export const signUpFields = [
	{
		label: 'Your email address',
		name: 'email',
		noValue: 'Please, insert a valid email address',
		type: 'text'
	},
	{
		label: 'Create a password',
		name: 'password',
		noValue: 'You must provide a password!',
		type: 'password'
	},
	{
		label: 'Confirm your password',
		name: 'confirmpassword',
		noValue: 'Please, confirm your password',
		type: 'password'
	}
];

//loginForm fields
export const loginFields = [
	{
		label: 'Email address',
		name: 'email',
		noValue: 'Please, enter your email address',
		type: 'text'
	},
	{
		label: 'Password',
		name: 'password',
		noValue: 'Please, enter your password',
		type: 'password'
	}
];

//forgotPassword Fields
export const forgotPasswordFields = [
	{
		label: 'Email address',
		name: 'email',
		type: 'text',
		noValue: ' Please enter a valid email address'
	}
];

//change survey title
export const changeTitleFields = [
	{
		label: 'Set a new title',
		name: 'changeTitle',
		type: 'text',
		noValue: 'Please enter a new title'
	}
];

export const addEmailsFields = [
	{
		label: 'Example: john@doe.com, jane@doe.net',
		name: 'recipients',
		type: 'text',
		noValue: 'You must provide at least one email',
		styles: {
			width: '100%',
			subWidth: {
				width: '825px',
				marginLeft: '5px',
				marginRight: '15px'
			}
		}
	}
];

export const emailSubjectFields = [
	{
		label: 'Email Subject Line: ',
		name: 'emailSubject',
		type: 'text',
		noValue: 'You must provide an email subject',
		placeholder: "'Research poll 2018'",
		styles: {
			width: '100%',
			subWidth: {
				width: '400px',
				marginLeft: '5px',
				marginRight: '15px'
			}
		}
	},
	{
		label: 'From: ',
		name: 'emailFrom',
		type: 'text',
		noValue: 'You must specify the From field',
		placeholder: "'My Organization Name'",
		styles: {
			width: '100%',
			subWidth: {
				width: '400px',
				marginLeft: '5px',
				marginRight: '15px'
			}
		}
	}
];

export const emailBodyFields = [
	{
		label: 'Title: ',
		name: 'emailTitle',
		type: 'text',
		noValue: 'You must provide an email title',
		placeholder: "'My research title'",
		styles: {
			width: '100%',
			subWidth: {
				width: '400px',
				marginLeft: '5px',
				marginRight: '15px'
			}
		}
	},
	{
		label: 'Subtitle: ',
		name: 'emailSubtitle',
		type: 'text',
		noValue: 'You must provide an email subtitle',
		placeholder: "'This is a research subtitle that explains the title'",
		styles: {
			width: '100%',
			subWidth: {
				width: '400px',
				marginLeft: '5px',
				marginRight: '15px'
			}
		}
	},
	{
		label: 'Description: ',
		name: 'emailDescription',
		type: 'text',
		multiline: true,
		fullWidth: true,
		noValue: 'You must provide a description for your email',
		placeholder: "'This is a detailed description of my poll goals'",
		styles: {
			marginLeft: '5px',
			marginRight: '5px',
			width: '100%',
			subWidth: {
				width: '825px'
			}
		}
	}
];

//resetPassword fields
export const resetPasswordFields = [
	{
		label: 'Create new password',
		name: 'password',
		noValue: 'You must provide a password!',
		type: 'password'
	},
	{
		label: 'Confirm your new password',
		name: 'confirmpassword',
		noValue: 'Please, confirm your password',
		type: 'password'
	}
];
