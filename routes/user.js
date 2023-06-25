const router = require('express').Router();
const usersController = require('../controllers/user')

router.get('/:userId', usersController.getUserByUserId);

router.post('/', usersController.createNewUser);

router.put('/:userId', usersController.updateUser);

router.delete('/:userId', usersController.deleteUser);

module.exports = router;