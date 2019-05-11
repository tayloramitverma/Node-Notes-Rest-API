module.exports = (app) => {
    const users = require('../controllers/users.controller.js');

    // Create a new User
    app.post('/users', users.create);

    app.get('/users', users.findAll);
    app.get('/users-with-notes', users.findAllUsersWithNotes);

    app.post('/login', users.login);

}