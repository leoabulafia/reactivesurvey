const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');

require('./models/User');
require('./models/Survey');

//connect to mongodb
mongoose.connect(keys.mongoURI);

//Incoming request body will be available in req.body
app.use(bodyParser.json());

//set cookies
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey]
	})
);

//initialize passport
app.use(passport.initialize());
app.use(passport.session());

//require routes
require('./routes/authRoutes')(app);
require('./routes/mailRoutes')(app);
require('./routes/surveyRoutes')(app);

//require passport strategies, serialize and deserialize
require('./services/passport');

//Express in production!
//order of operations is important
if (process.env.NODE_ENV === 'production') {
	//First, if any request comes and it isn't handled by Express,
	//look out for /client/build
	app.use(express.static('client/build'));
	//Second, if don't know what route is just serve index.html
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.port || 5000;
app.listen(PORT);
