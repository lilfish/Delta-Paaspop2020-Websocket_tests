import {
	adminChecker
} from '../middleware';
import { Admins, Users } from '../db/models'


module.exports = function (app) {

	app.get('/login', (req, res) => {
		res.render('login');
	})
	app.post('/login', function (req, res) {
		var username = req.body.username,
			password = req.body.password;
		Admins.findOne({
			username: username
		}).then(function (admin) {
			if (!admin) {
				res.send("No user?")
			} else if (!admin.comparePassword(password)) {
				res.send("Wrong pass?");
			} else {
				req.session.admin = admin._id;
				res.redirect('/');
			}
		});
	});

	app.get('/', adminChecker, function(req, res){
		Admins.findOne({
			_id: req.session.admin
		}).then(function(admin){
				res.render('index', {screen: 'home', name: admin.username })
		})
	})

	app.all('/logout', function (req, res) {
		if (req.session.admin && req.cookies.user_sid) {
			res.clearCookie('user_sid');
			req.session.destroy();
			res.redirect('/login');
		} else {
			res.send("no session?");
		}
	})

	app.get("/users", adminChecker, function(req, res){
		Users.find({}).then(function(users){
			res.render('index', {screen: 'users', users: users})
		})
	})
	//other routes..
}