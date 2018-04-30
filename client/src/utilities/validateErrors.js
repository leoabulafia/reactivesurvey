import {
  validateEmail,
  validatePassword,
  validateConfirmPassword
} from './validateMail';
import {
  signUpFields,
  loginFields,
  forgotPasswordFields,
  resetPasswordFields
} from '../components/authForms/formFields.js';

export const validateErrors = values => {
  const errors = {};

  errors.email = validateEmail(values.email || '');
  errors.password = validatePassword(values.password || '');
  errors.confirmpassword = validateConfirmPassword(
    values.confirmpassword || '',
    values.password || ''
  );

  [
    ...signUpFields,
    ...loginFields,
    ...forgotPasswordFields,
    ...resetPasswordFields
  ].forEach(({ name, noValue }) => {
    if (!values[name]) {
      errors[name] = noValue;
    }
  });

  return errors;
};
