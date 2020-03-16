import {
	sessionChecker
} from '../middleware';
import 	Users from '../db/models/users'

module.exports = function (app) {
	app.post('/api/login', function (req, res) {
		var username = req.body.username,
			password = req.body.password;
		Users.findOne({
			username: username
		}).then(function (user) {
			if (!user) {
				res.send("No user?")
			} else if (!user.comparePassword(password)) {
				res.send("Wrong pass?");
			} else {
				req.session.user = user._id;
				res.send("logged in?");
			}
		});
	});

	app.post('/api/register', function (req, res) {
		Users.create({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			})
			.then(user => {
				req.session.user = user._id;
				res.send("user registered")
			})
			.catch(error => {
				console.log(error);
				res.send("coulnd't register")
			});
	});

	app.post('/api/logout', function (req, res) {
		if (req.session.user && req.cookies.user_sid) {
			res.clearCookie('user_sid');
			req.session.destroy();
			res.send("cleared");
		} else {
			res.send("no session?");
		}
	})



	//other routes..
}