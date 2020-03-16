require('dotenv').config()

const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

// Import all database related things (models and stuff)
import db from './server/db'

app.use(bodyParser.urlencoded({
	extended: true
}));

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
// app.use(session({
// 	key: 'user_sid',
// 	secret: 'somerandonstuffs',
// 	resave: false,
// 	saveUninitialized: false,
// 	cookie: {
// 		expires: 600000
// 	}
// }));

require('./server/db')(app);

app.set('view engine', 'pug')
app.set('public', path.join(__dirname, 'front-end/public'));
app.set('views', path.join(__dirname, 'front-end/views'));
app.locals.basedir = path.join(__dirname, 'front-end/public');


require('./server/routes/adminRoutes')(app);
require('./server/routes/userRoutes')(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))