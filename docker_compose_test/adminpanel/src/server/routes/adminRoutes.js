import {
	adminChecker
} from '../middleware';

import Admin from '../db/models/admin' //REMOVE THIS LATER
import User from '../db/models/user' //REMOVE THIS LATER

import { AdminController } from '../controllers'

module.exports = function (app) {

	app.get('/login', AdminController.get_login);
	app.post('/login', AdminController.login);

	app.get('/', adminChecker, function(req, res){
		Admin.findOne({
			_id: req.session.admin
		}).then(function(admin){
				res.render('index', {screen: 'home', name: admin.username })
		})
	})

	app.all('/logout', AdminController.logout)

	app.get("/users", adminChecker, function(req, res){
		User.find({}).then(function(users){
			res.render('index', {screen: 'users', users: users})
		})
	})
	app.get("/users/:id", adminChecker, function(req, res){
		User.findOne({_id: req.params.id}).then(function(user){
			if(!user){
				res.send("no user found?")
			} else {
				res.render('index', {screen: 'user', user: user})
			}
		})
	})
	//other routes..
}