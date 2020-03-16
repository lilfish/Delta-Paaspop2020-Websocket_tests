import {
	adminChecker
} from '../middleware';
import Admins from '../db/models/admin'


module.exports = function (app) {
	app.get('/login', adminChecker, (req, res) => {
		res.render('index', {
			title: 'Hey',
			message: 'Hello there!'
		});
	})
	//other routes..
}