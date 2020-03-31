'use strict';

const userModel = require('../model/user');


async function register(req, res, next) {
	const user = new userModel.User(
		1, 
		req.body.login, 
		req.body.senha, 
		req.body.email, 
		0
	);	

	try {
		await userModel.register(user, (err, id) => {
			if(err)
				throw new Error(err);
		});
		res.status(201).send();
	} catch(err) {
		console.log(err);
		res.status(409).send();
	}
}

module.exports = {
	register: register
}