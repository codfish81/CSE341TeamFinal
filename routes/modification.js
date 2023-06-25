const router = require('express').Router();
const modController = require('../controllers/modification')

router.get('/', modController.getAllMod);
router.get('/:modId', modController.getModById);
router.get('/mod/:userId', modController.getModByUserId);
router.get('/mod/:recipeTypeId', modController.getModByType);

router.post('/', modController.addNewMod);

router.put('/:modId', modController.updateModById);

router.delete('/:modId', modController.deleteModById);

module.exports = router;