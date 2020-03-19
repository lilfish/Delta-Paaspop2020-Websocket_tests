exports.sessionChecker = (req, res, next) => {
	if (!req.session.user && !req.cookies.user_sid) {
			res.statusCode = 401;
			res.send("Not logged in");
	} else {
			next();
	}    
};

exports.adminChecker = (req, res, next) => {
	if (!req.session.admin && !req.cookies.user_sid) {
			res.redirect('/login');
	} else {
			next();
	}    
};