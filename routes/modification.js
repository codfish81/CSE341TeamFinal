const router = require('express').Router();
const modController = require('../controllers/modification')
const {  ensureAuth } = require('../controllers/authentication');
const { modIdValidation, userIdValidation, typeIdValidation, addNewModValidation, updateModByIdValidation, validateError, deleteModByIdValidation } = require('../validation/modificationValidation')

router.get('/', modController.getAllMod);
router.get('/:modId', ensureAuth, modIdValidation(), validateError, modController.getModById);
router.get('/:userId', ensureAuth, userIdValidation(), validateError, modController.getModByUserId);
router.get('/:recipeTypeId', ensureAuth, typeIdValidation(), validateError, modController.getModByType);

router.post('/', ensureAuth, addNewModValidation(), validateError, modController.addNewMod);

router.put('/:modId', ensureAuth, updateModByIdValidation(), validateError, modController.updateModById);

router.delete('/:modId', ensureAuth, deleteModByIdValidation(), validateError, modController.deleteModById);


module.exports = router;