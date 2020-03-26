var mysql = require('../modules/mysql');

function User(id, login, senha, email, role){
    this.id = id;
    this.login = login;
    this.senha = senha;
    this.email = email;
    this.role = role;
}

function register(user, callback){
    mysql.pool.query('insert into users (login, password, email, confirmed) values(?, ?, ?, ?)',
        [user.login, user.senha, user.email, user.role, 0],
            function(error, results, fields){
                if(error){
                    return callback(error);
                }

                return callback(null, results.insertId);
            });
}

function findByLogin(login, callback){
    mysql.pool.query('SELECT *FROM users where login = ?', [login], 
    function(error, results, fields){
        if(error){
            return callback(error);
        }

        if(results.length !== 0){
        	results[0]['confirmed'] = results[0]['confirmed'] === 1;

            return callback(error, results[0]);
        }else{
            return callback(error, null);
        }
    });
}

function confirmUserRegister(id, callback){
	mysql.pool.query('update users set confirmed=1 where id = ?', [id],
		function(error, results, fields){
			if(error){
				return callback(error);
			}

			return callback(null);
		});
}

module.exports = {
	User: User,
	findByLogin: findByLogin,
	register: register,
	confirmUserRegister: confirmUserRegister
}