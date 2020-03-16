module.exports = function (app) {

	var User = require('../db/models/users');

	app.get('/login', function (req, res) {
		res.render('login', {
			title: 'Express Login'
		});
	});

	app.post('/register', function (req, res) {
		console.log("Came here");
		console.log(req.body);
		User.create({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
			})
			.then(user => {
				req.session.user = user._id;
				console.log(req.session.user);
				res.redirect('/dashboard');
			})
			.catch(error => {
				console.log(error);
				res.redirect('/signup');
			});
	});



	//other routes..
}