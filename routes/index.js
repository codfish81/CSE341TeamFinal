const router = require('express').Router();

router.use('/recipe', require('./recipe'));
router.use('/users', require('./user'));
router.use('/modifications', require('./modification'));
router.use('/comments', require('./comment'));
router.use('/auth', require('./authentication'));

router.get('/', (req, res) => {
    res.sendFile('/public/login.html', { root: './' });
  });

module.exports = router;
