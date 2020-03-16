require('dotenv').config()

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


import {
	Points,
	Users
} from './models';

mongoose.set('useCreateIndex', true);

mongoose.connect(process.env.MONGO_URI, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then(() => console.log('DB Connected!'))
	.catch(err => {
		console.log("Couldn't connect to DB");
	});

module.exports = function (app) {
	console.log("setting sessions to mongo store")
	app.use(session({
		store: new MongoStore({
			mongooseConnection: mongoose.connection
		}),
		secret: 'somerandonstuffs',
		resave: false,
		saveUninitialized: false,
	}));
}
