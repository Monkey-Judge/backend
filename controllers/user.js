'use strict';

const userModel = require('../model/user');
const passwordHelper = require('../modules/passwordHelper');


function register(req, res, next) {
	
	const encryptedPassword = 
		passwordHelper.encrypt(req.body.password);
	console.log(encryptedPassword);
	const user = new userModel.User(
		1, 
		req.body.login, 
		encryptedPassword.hash,
		encryptedPassword.salt, 
		req.body.email, 
		0
	);

	userModel.register(user, (err, id) => {
		if(!err)
			res.status(201).send();
		else
		{
			console.log(err);
			res.status(409).send();
		}
	});
}

module.exports = {
	register: register
}