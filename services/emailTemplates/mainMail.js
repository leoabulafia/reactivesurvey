const keys = require('../../config/keys');

module.exports = (
	option,
	emailTitle,
	emailSubtitle,
	emailDescription,
	questionText
) => {
	return `
    <html>
      <body>
        <div style="text-align: center; border: 5px solid #003d82; border-radius: 10px;">
          <div style="margin-top: 50px;">
            <h1>${emailTitle}</h1>
            <h3>${emailSubtitle}</h3>
            <p>${emailDescription}</p>
						<h2>${questionText}</h2>
          </div>
					<div style="margin: 50px">
						${option}
					</div>
        </div>
      </body>
    </html>
  `;
};
