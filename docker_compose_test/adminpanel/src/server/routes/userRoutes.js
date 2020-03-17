import {
	sessionChecker
} from '../middleware';

import { UserController } from '../controllers'

module.exports = function (app) {
	app.post('/api/login', UserController.login);
	app.post('/api/register', UserController.register);
	app.post('/api/logout', UserController.logout);

	app.get('/api/test', function(req, res) {
		console.log(req.session)
		User.findOne({_id: req.session.user}).then(function(user){
			console.log(user);
		})
		res.send("HOI");
	})

	app.get('/api/test2', sessionChecker, function(req, res) {
		res.send("HOI");
	})
	//other routes..
}