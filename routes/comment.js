const router = require('express').Router();
const commentsController = require('../controllers/comment')
const {  ensureAuth } = require('../controllers/authentication');
const {commentIdValidation, userIdValidation, recipeIdValidation, createNewCommentValidation, updateCommentValidation, validateError} = require('../validation/commentValidation')

router.get('/:commentId', ensureAuth, commentIdValidation(), validateError, commentsController.getCommentByCommentId);
router.get('/users/:userId', ensureAuth, userIdValidation(), validateError, commentsController.getCommentsByUserId);
router.get('/recipe/:recipeId', ensureAuth, recipeIdValidation(), validateError, commentsController.getCommentsByRecipeId);

router.post('/', ensureAuth, createNewCommentValidation(), validateError, commentsController.createNewComment);

router.put('/:commentId', ensureAuth, updateCommentValidation(), validateError, commentsController.updateComment);

router.delete('/:commentId', ensureAuth, commentIdValidation(), validateError, commentsController.deleteComment);

module.exports = router;