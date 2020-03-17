import Admin from '../db/models/admin'
import User from '../db/models/user'

exports.get_login = async function (req, res) {
	/**
	 * GET / login endpoint *
	 * @export *
	 * @param { any } req
	 * @param { any } res
	 * @return { render } Returns the login page
	 */
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
	 * @return { res } redirect to /
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
	 * @return { res } redirect to /login
	 */
	if (req.session.admin && req.cookies.user_sid) {
		res.clearCookie('user_sid');
		req.session.destroy();
		res.redirect('/login');
	} else {
		res.send("no session?");
	}
}
exports.get_home = async function (req, res) {
	/**
	 * GET / endpoint *
	 * @export *
	 * @param { any } req
	 * @param { any } res
	 * @return { res } render index with home screen
	 */
	Admin.findOne({
		_id: req.session.admin
	}).then(function (admin) {
		res.render('index', {
			screen: 'home',
			name: admin.username
		})
	})
}

exports.get_users = async function (req, res) {
	/**
	 * GET / endpoint *
	 * @export *
	 * @param { any } req
	 * @param { any } res
	 * @return { res } render index with users screen
	 */
	User.find({}).then(function (users) {
		res.render('index', {
			screen: 'users',
			users: users
		})
	})
}

exports.get_user = async function (req, res) {
		/**
	 * GET / endpoint *
	 * @export *
	 * @param { any } req
	 * @param { any } res
	 * @return { res } render index with user screen
	 */
	User.findOne({
		_id: req.params.id
	}).then(function (user) {
		if (!user) {
			res.send("no user found?")
		} else {
			res.render('index', {
				screen: 'user',
				user: user
			})
		}
	})
}