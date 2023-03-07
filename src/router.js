const router = require('express-promise-router')();

const authMiddleware = require('./middlewares/authMiddleware').authMiddleware;

const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const noteController = require('./controllers/noteController');

router.route('/signup').post(userController.signUp);
router.route('/login').post(authController.login);
router.route('/logout').post(authMiddleware, authController.logout);
router.route('/notes').post(authMiddleware, noteController.addNote);
router.route('/notes/:id').put(authMiddleware, noteController.updateNote);
router.route('/notes/:id').delete(authMiddleware, noteController.deleteNote);
router.route('/notes/:id').get(authMiddleware, noteController.getNote);
router.route('/notes').get(authMiddleware, noteController.getNotesOfUser);

module.exports = {
    router
};