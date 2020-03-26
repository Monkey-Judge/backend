var user = require('../model/user');

test('correctRegister', done => {
    usuario = {
        id: 0,
        login: 'rafael',
        senha: 'rafael',
        email: 'rafael@gmail.com'
    };

    user.register(usuario, function(error, id){
        expect(error).toBe(null);

        user.erase(id);

        done();
    });
});

test('confirmUserRegister', done => {
    usuario = {
        id: 0,
        login: 'rafael',
        senha: 'rafael',
        email: 'rafael@gmail.com',
        confirmed: false
    };

    user.register(usuario, function(error, id){
        expect(error).toBe(null);

        user.confirmUserRegister(id, function(error){
            expect(error).toBe(null);

            user.erase(id);

            done();
        });
    });
});

test('findByLogin', done => {
    usuario = {
        id: 0,
        login: 'rafael',
        senha: 'rafael',
        email: 'rafael@gmail.com',
        confirmed: false
    };

    user.register(usuario, function(error, id){
        expect(error).toBe(null);

        user.findByLogin('rafael', function(error, usuario){
            expect(error).toBe(null);

            expect(id).toBe(usuario.id);

            user.erase(id);

            done();
        });
    });
});