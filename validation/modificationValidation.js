const {body, validationResult, param} = require('express-validator')

const modIdValidation = () => {
    return [
        param('modId')
        .isString().withMessage("The modId should be a string.")
        .isLength({min:24, max:24}).withMessage("The modId should be 24 characters long.")
    ]
}
const userIdValidation = () => {
    return [
        param('userId')
        .isString().withMessage("The userId should be a string.")
        .isLength({min:24, max:24}).withMessage("The userId should be 24 characters long.")
    ]
}

const typeIdValidation = () => {
    return [
        param('typeId')
        .isString().withMessage("The typeId should be a string.")
        .isLength({min:24, max:24}).withMessage("The typeId should be 24 characters long.")
    ]
}

const addNewModValidation = () => {
    return [
        body('date')
        .isString().withMessage("The today date must be a string")
        .isLength({min:10, max:10}).withMessage("The date should be 10 characters long (10/20/1998)."),

        body('modified_collection')
        .isString().withMessage("The modified collection must be a string")
        .notEmpty().withMessage("modified collection must not be empty."),

        body('modified_type')
        .isString().withMessage("modified type must be a string")
        .notEmpty().withMessage("modified type must not be empty."),
        
        body('userId')
        .isString().withMessage("The userId must be a string")
        .isLength({min:24, max:24}).withMessage("The userId should be 24 characters long.")
    ]
}

const updateModByIdValidation = () => {
    return [
        body('today_date')
        .isString().withMessage("The date must be a string")
        .isLength({min:10, max:10}).withMessage("The date should be 10 characters long (10/20/1998)."),

        body('collection')
        .isString().withMessage("The modified collection must be a string")
        .notEmpty().withMessage("modified collection must not be empty."),

        body('type')
        .isString().withMessage("modified type must be a string")
        .notEmpty().withMessage("modified type must not be empty."),
        
        body('userId')
        .isString().withMessage("The userId must be a string")
        .isLength({min:24, max:24}).withMessage("The userId should be 24 characters long.")          
    ]
}

const deleteModByIdValidation = () => {
    return [
        body('modId')
        .isString().withMessage("The modId must be a string")
        .isLength({min:24, max:24}).withMessage("The modId should be 24 characters long.")       
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

module.exports = 
{
    modIdValidation,
    userIdValidation,
    typeIdValidation,
    addNewModValidation,
    updateModByIdValidation,
    deleteModByIdValidation,
    validateError
}