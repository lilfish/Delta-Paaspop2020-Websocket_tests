exports.sessionChecker = (req, res, next) => {
	if (req.session.user && req.cookies.user_sid) {
			res.redirect('/home');
	} else {
			next();
	}    
};

exports.adminChecker = (req, res, next) => {
	if (req.session.user && req.cookies.user_sid) {
			res.redirect('/home');
	} else {
			next();
	}    
};