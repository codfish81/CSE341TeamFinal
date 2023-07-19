const router = require('express').Router();
const modController = require('../controllers/modification')
const {  ensureAuth } = require('../controllers/authentication');
const { modIdValidation, userIdValidation, typeIdValidation, addNewModValidation, updateModByIdValidation, validateError, deleteModByIdValidation } = require('../validation/modificationValidation')

router.get('/', modController.getAllMod);
router.get('/:modId', modIdValidation(), validateError, ensureAuth, modController.getModById);
router.get('/:userId', userIdValidation(), validateError, ensureAuth, modController.getModByUserId);
router.get('/:recipeTypeId', typeIdValidation(), validateError, ensureAuth, modController.getModByType);

router.post('/', addNewModValidation(), validateError, ensureAuth, modController.addNewMod);

router.put('/:modId', updateModByIdValidation(), validateError, ensureAuth, modController.updateModById);

router.delete('/:modId', deleteModByIdValidation(), validateError, ensureAuth, modController.deleteModById);


module.exports = router;