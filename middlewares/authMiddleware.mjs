import jwt from 'jsonwebtoken';

const isAuthorized = (req, res, next) => {
	const token = req.cookies.token;

	if (!token) {
		req.isAuth = false;
		req.app.locals.user = null;
		return next();
	}

	jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
		if (err) {
			req.isAuth = false;
			req.app.locals.user = null;
		} else {
			req.isAuth = true;
			req.app.locals.user = data;
		}
		next();
	});
};

export default isAuthorized;
