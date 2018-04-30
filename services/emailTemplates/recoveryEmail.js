const keys = require('../../config/keys');

module.exports = token => {
	return `
    <html>
      <body>
        <div style="text-align: center; border: 5px solid #003d82; border-radius: 10px;">
          <div style="margin-top: 50px;">
            <h1>Authentication with React and PassportJS</h1>
            <h2>Hi there,</h2>
            <h2>To reset your password, please click here:</h2>
          </div>

          <div style="margin: 50px;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center">
                  <table border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center" style="border-radius: 3px;" bgcolor="#003d82"><a href="${
												keys.redirectDomain
											}/auth/resetpassword/${token}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; text-decoration: none;border-radius: 3px; padding: 12px 18px; border: 1px solid #003d82; display: inline-block;">Reset Password</a></td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </body>
    </html>
  `;
};
