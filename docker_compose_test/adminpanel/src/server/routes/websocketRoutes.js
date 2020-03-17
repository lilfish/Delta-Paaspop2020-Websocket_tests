import { WebsocketController } from '../controllers'

module.exports = function (app) {
	app.get('/ws/test', WebsocketController.test);
}