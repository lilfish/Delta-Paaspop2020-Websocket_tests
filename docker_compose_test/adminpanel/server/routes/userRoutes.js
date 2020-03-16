import {
	sessionChecker
} from '../middleware';
import Users from '../db/models/users'

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
				password: req.body.password,
				nickname: req.body.nickname
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

	app.get('/api/test', function(req, res) {
		console.log(req.session)
		Users.findOne({_id: req.session.user}).then(function(user){
			console.log(user);
		})
		res.send("HOI");
	})

	app.get('/api/test2', sessionChecker, function(req, res) {
		res.send("HOI");
	})



	//other routes..
}