const router = require('express').Router();
const usersController = require('../controllers/user')
const {  ensureAuth } = require('../controllers/authentication');
const {validateNewUser, validateUserId, validateUpdateUser} = require('../validation/validateUser')

router.get('/:userId', validateUserId(), usersController.getUserByUserId);

router.post('/', validateNewUser(), usersController.createNewUser);

router.put('/:userId', validateUpdateUser(), usersController.updateUser);

router.delete('/:userId', usersController.deleteUser);

module.exports = router;