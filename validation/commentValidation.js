const {body, validationResult, param} = require('express-validator')

const commentIdValidation = () => {
    return [
        param('commentId')
        .isString().withMessage("The commentId should be a string.")
        .isLength({min:24, max:24}).withMessage("The commentId should be 24 characters long.")
    ]
}

const userIdValidation = () => {
    return [
        param('userId')
        .isString().withMessage("The userId should be a string.")
        .isLength({min:24, max:24}).withMessage("The userId should be 24 characters long.")
    ]
}

const recipeIdValidation = () => {
    return [
        param('recipeId')
        .isString().withMessage("The recipeId should be a string.")
        .isLength({min:24, max:24}).withMessage("The recipeId should be 24 characters long.")
    ]
}

const createNewCommentValidation = () => {
    return [
        body('userId')
        .isString().withMessage("The userId must be a string")
        .isLength({min:24, max:24}).withMessage("The userId should be 24 characters long."),

        body('recipeId')
        .isString().withMessage("The recipeId must be a string")
        .isLength({min:24, max:24}).withMessage("The recipeId should be 24 characters long."),

        body('text')
        .isString().withMessage("Text must be a string")
        .notEmpty().withMessage("text must not be empty.")            
    ]
}

const updateCommentValidation = () => {
    return [
        body('text')
        .isString().withMessage("Text must be a string")
        .notEmpty().withMessage("text must not be empty.")            
    ]
}

const validateError = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = errors.array().map(err => ({ [err.path]: err.msg }));
  
    return res.status(422).json({
      errors: extractedErrors,
    })
}

module.exports = {
    commentIdValidation,
    userIdValidation,
    recipeIdValidation,
    createNewCommentValidation,
    updateCommentValidation,
    validateError
}