const regexMail = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPass = /^([a-zA-Z0-9@*#]{8,15})$/;

export const validateEmail = email => {
  if (regexMail.test(email) === false) {
    return `${email} is an invalid email address`;
  }
  return;
};

export const validatePassword = password => {
  if (regexPass.test(password) === false) {
    return 'Password must consists of at least 8 characters and not more than 15 characters';
  }
  return;
};

export const validateConfirmPassword = (password, confirmpassword) => {
  if (password !== confirmpassword) {
    return "Passwords don't match!";
  }
  return;
};
