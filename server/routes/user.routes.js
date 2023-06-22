const UserController = require('../controllers/user.controller');


module.exports = app => {
    app.post('/api/register', UserController.register);
    app.post('/api/login', UserController.login);
    app.post('/api/logout', UserController.logout);
    app.get('/api/users/logged', UserController.logged);

    app.get('/api/users', UserController.getAllUsers);
    app.get('/api/users/:id', UserController.getOneUser);
    app.patch('/api/users/:id', UserController.updateUser);

}