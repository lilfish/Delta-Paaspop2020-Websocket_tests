require('dotenv').config()

import websocket_connections from '../websocket'
import Game from '../db/models/game'
import History from '../db/models/history'
import axios from 'axios';
import randomToken from 'random-token';

exports.start_game = async function (req, res) {
	/**
	 * Post /start  endpoint for starting a game.
	 * @export *
	 * @param { any } req
	 * @param { any } res
	 * @returns { boolean } game started true/false
	 */
	let game_token = randomToken(16);

	History.findOne({
		gameEnded: null
	}).then(function (current_game) {
		if (current_game) {
			return res.status(500).send('Er is al een spel gestart.');
		}
		Game.findOne({
			_id: req.body.game_id
		}).then(function (game) {
			var newHistory = new History({
				game: game,
				game_token: game_token,
				gameStarted: new Date()
			});

			axios.post('http://localhost:9000/start_game', {
					token: process.env.ADMIN_TOKEN,
					game_token: game_token,
					game_name: game.name
				})
				.then(function (response) {
					newHistory.save();
					res.send(response);
				})
				.catch(function (error) {
					res.status(500).send(error);
				});

		})
	})
}

exports.stop_game = async function (req, res) {
	History.findOne({
		gameEnded: null
	}).populate('game').then(function (current_game) {
		if (!current_game) {
			return res.status(500).send('Geen spel gestart.');
		} else {
			axios.post('http://localhost:9000/stop_game', {
					token: process.env.ADMIN_TOKEN,
					game_name: current_game.game.name
				})
				.then(function (response) {
					current_game.gameEnded = new Date();
					current_game.save();
					res.send("Spel is gestopt.");
				})
				.catch(function (error) {
					res.status(500).send(error);
				});
		}
	});

}

exports.get_current = async function (req, res) {
	/**
	 * Get /currently  endpoint for getting current game status
	 * @export *
	 * @param  { any } req
	 * @param  { any } res
	 * @returns { object } current_game
	 */
	Game.find({
		gameEnded: null
	}).then(function (game) {
		if (!game)
			res.send(false);
		res.send(game);
	});
}