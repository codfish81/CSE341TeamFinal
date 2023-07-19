const router = require('express').Router();
const modController = require('../controllers/modification')
const {  ensureAuth } = require('../controllers/authentication');

router.get('/', ensureAuth, modController.getAllMod);
router.get('/:modId', ensureAuth, modController.getModById);
router.get('/:userId', ensureAuth, modController.getModByUserId);
router.get('/:recipeTypeId', ensureAuth, modController.getModByType);

router.post('/', ensureAuth, modController.addNewMod);

router.put('/:modId', ensureAuth, modController.updateModById);

router.delete('/:modId', ensureAuth, modController.deleteModById);

module.exports = router;