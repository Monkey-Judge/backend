'use strict';

const userModel = require('../model/user');


function register(req, res, next) {
	const user = new userModel.User(
		1, 
		req.body.login, 
		req.body.senha, 
		req.body.email, 
		0
	);

	userModel.register(user, (err, id) => {
		if(!err)
			res.status(201).send();
		else
			res.status(409).send();
	});
}

module.exports = {
	register: register
}