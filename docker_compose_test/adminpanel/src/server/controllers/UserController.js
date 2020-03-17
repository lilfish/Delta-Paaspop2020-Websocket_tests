import User from '../db/models/user'

exports.login = async function (req, res) {
	/**
	 * POST auth / login endpoint *
	 * @export *
	 * @param { any } req
	 * @param { any } res
	 */
	var username = req.body.username,
		password = req.body.password;
	User.findOne({
		username: username
	}).then(function (user) {
		console.log(req.body.password);
		if (!user) {
			res.send("No user?F")
		} else if (!user.comparePassword(password)) {
			res.send("Wrong pass?");
		} else {
			req.session.user = user._id;
			res.send("logged in?");
		}
	});
}
exports.register = async function (req, res) {
	/**
	 * POST auth / login endpoint *
	 * @export *
	 * @param { any } req
	 * @param { any } res
	 */
	User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.password,
			nickname: req.body.nickname
		})
		.then(user => {
			req.session.user = user._id;
			res.send("user registered")
		})
		.catch(error => {
			console.log(error);
			res.send("coulnd't register")
		});
}
exports.logout = async function (req, res) {
	/**
	 * POST auth / login endpoint *
	 * @export *
	 * @param { any } req
	 * @param { any } res
	 */
	if (req.session.user && req.cookies.user_sid) {
		res.clearCookie('user_sid');
		req.session.destroy();
		res.send("cleared");
	} else {
		res.send("no session?");
	}
}