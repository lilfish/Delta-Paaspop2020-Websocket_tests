import {
	sessionChecker
} from '../middleware';


module.exports = function (app) {

	// app.get('/login', sessionChecker, (req, res) => {
	// 	res.render('index', {
	// 		title: 'Hey',
	// 		message: 'Hello there!'
	// 	});
	// })

	app.get('/', function (req, res) {
		if (req.session.user && req.cookies.user_sid) {
			res.send('Hello World!');
		} else {
			res.redirect('/login');
		}
	})

	//other routes..
}