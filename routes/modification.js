const router = require('express').Router();
const modController = require('../controllers/modification')
const {  ensureAuth } = require('../controllers/authentication');
const { modIdValidation, userIdValidation, typeIdValidation, addNewModValidation, updateModByIdValidation, validateError, deleteModByIdValidation } = require('../validation/modificationValidation')

router.get('/', modController.getAllMod);
router.get('/:modId', modIdValidation(), validateError, modController.getModById);
router.get('/:userId', userIdValidation(), validateError, modController.getModByUserId);
router.get('/:recipeTypeId', typeIdValidation(), validateError, modController.getModByType);

router.post('/', addNewModValidation(), validateError, modController.addNewMod);

router.put('/:modId', updateModByIdValidation(), validateError, modController.updateModById);

router.delete('/:modId', deleteModByIdValidation(), validateError, modController.deleteModById);


module.exports = router;