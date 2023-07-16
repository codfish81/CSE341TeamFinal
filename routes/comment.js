const router = require('express').Router();
const commentsController = require('../controllers/comment')
const {commentIdValidation, userIdValidation, recipeIdValidation, createNewCommentValidation, updateCommentValidation, validateError} = require('../validation/commentValidation')

router.get('/:commentId', commentIdValidation(), validateError, commentsController.getCommentByCommentId);
router.get('/users/:userId', userIdValidation(), validateError, commentsController.getCommentsByUserId);
router.get('/recipe/:recipeId', recipeIdValidation(), validateError, commentsController.getCommentsByRecipeId);

router.post('/', createNewCommentValidation(), validateError, commentsController.createNewComment);

router.put('/:commentId', updateCommentValidation(), validateError, commentsController.updateComment);

router.delete('/:commentId', commentIdValidation(), validateError, commentsController.deleteComment);

module.exports = router;