const router = require('express').Router();

<<<<<<< HEAD
router.use('/recipes', require('./recipe'));
=======

router.use('/recipe', require('./recipe'));
>>>>>>> origin/main
router.use('/users', require('./user'));
router.use('/modifications', require('./modification'));
router.use('/comments', require('./comment'));


module.exports = router;
