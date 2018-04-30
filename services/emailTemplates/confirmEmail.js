const keys = require('../../config/keys');

module.exports = token => {
  return `
    <html>
      <body>
        <div style="text-align: center">
          <h3>Welcome to MailSurveys</h3>
          <p>Please confirm your email address</p>
          <div>
            <a href="${keys.redirectDomain}/auth/confirm/${token}">Confirm</a>
          </div>
        </div>
      </body>
    </html>
  `;
};
