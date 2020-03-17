import Admin from '../db/models/admin'
import User from '../db/models/user'

exports.get_login = async function (req, res) {
	res.render('login');
}

exports.login = async function (req, res) {
	/**
	 * GET / login endpoint *
	 * @export *
	 * @param { any } req
	 * @param req.body.username {String} The Username
	 * @param req.body.password {String} The user's password
	 * @param { any } res
	 */
	var username = req.body.username,
		password = req.body.password;
	Admin.findOne({
		username: username
	}).then(function (admin) {
		if (!admin) {
			res.send("No user?")
		} else if (!admin.comparePassword(password)) {
			res.send("Wrong pass?");
		} else {
			req.session.admin = admin._id;
			res.redirect('/');
		}
	});
}
exports.logout = async function (req, res) {
	/**
	 * POST / login endpoint *
	 * @export *
	 * @param { any } req
	 * @param { any } res
	 */
	if (req.session.admin && req.cookies.user_sid) {
		res.clearCookie('user_sid');
		req.session.destroy();
		res.redirect('/login');
	} else {
		res.send("no session?");
	}
}