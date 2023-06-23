const router = require('express').Router();

router.get('/recipes', (req, res, next) => {
    res.send("Here are the recipes");
})

module.exports = router;