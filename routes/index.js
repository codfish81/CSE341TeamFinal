const router = require('express').Router();

router.use('/recipe', require('./recipe'));
router.use('/users', require('./user'));
router.use('/modifications', require('./modification'));
router.use('/comments', require('./comment'));


module.exports = router;
