module.exports = function(app){

	var User = require('../models/users');
	
	app.get('/login', function(req, res){
			res.render('login', {
					title: 'Express Login'
			});
	});

	app.post('/register', function(req, res){
		User.create({
				username: req.body.username,
				email: req.body.email,
				password: req.body.password
		})
		.then(user => {
				req.session.user = user.dataValues;
				res.redirect('/dashboard');
		})
		.catch(error => {
				res.redirect('/signup');
		});
});
    


	//other routes..
}