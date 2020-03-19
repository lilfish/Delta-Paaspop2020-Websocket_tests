import {
	sessionChecker
} from '../middleware';

import {
	UserController,
	GameController
} from '../controllers'

module.exports = function (app) {
	app.post('/api/login', UserController.login);
	app.post('/api/register', UserController.register);
	app.post('/api/logout', sessionChecker, UserController.logout);
	app.get('/api/game_status', sessionChecker, UserController.game_status)
}