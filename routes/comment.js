const router = require('express').Router();
const commentsController = require('../controllers/comment')

router.get('/:commentId', commentsController.getCommentByCommentId);
router.get('/:userId', commentsController.getCommentsByUserId);
router.get('/:recipeId', commentsController.getCommentsByRecipeId);

router.post('/', commentsController.createNewComment);

router.put('/:commentId', commentsController.updateComment);

router.delete('/:commentId', commentsController.deleteComment);

module.exports = router;