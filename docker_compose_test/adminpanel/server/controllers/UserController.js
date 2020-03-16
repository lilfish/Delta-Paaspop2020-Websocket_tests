const {
	User
} = require('../models');

const UserController = {
	async index(req, res) {
		const users = await User
			.find()
			.populate("points");
		res.send(users);
	},
	async show(req, res) {
		const user = await User
			.findById(req.params.id)
			.populate("points");
		res.send(user);
	}
};
module.exports = UserController;