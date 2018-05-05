const keys = require('../config/keys');

const option = (index, emailKey, questionId, surveyKey, surveyTitle, text) => {
	return `
		<div style="margin: 10px;">
	    <table width="100%" border="0" cellspacing="0" cellpadding="0">
	      <tr>
	        <td align="center">
	          <table border="0" cellspacing="0" cellpadding="0" width="500px">
	            <tr>
	              <td align="center" style="border-radius: 3px;" bgcolor="#003d82"><a href="${
									keys.redirectDomain
								}/api/${emailKey}/${questionId}/${index}/${surveyKey}/${surveyTitle}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; text-decoration: none;border-radius: 3px; padding: 12px 18px; border: 1px solid #003d82; display: inline-block;">${text}</a></td>
	            </tr>
	          </table>
	        </td>
	      </tr>
	    </table>
		</div>`;
};

module.exports = option;
