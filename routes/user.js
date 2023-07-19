const router = require('express').Router();
const usersController = require('../controllers/user')
const {  ensureAuth } = require('../controllers/authentication');
const {validateNewUser, validateUserId, validateUpdateUser} = require('../validation/validateUser')

router.get('/:userId', ensureAuth, validateUserId(), usersController.getUserByUserId);

router.post('/', ensureAuth, validateNewUser(), usersController.createNewUser);

router.put('/:userId', ensureAuth, validateUpdateUser(), usersController.updateUser);

router.delete('/:userId', ensureAuth, usersController.deleteUser);

module.exports = router;