const {body, results, param} = require('express-validator');

const validateUserId = () => {
    return[
        param('userId')
        .isString().withMessage("The userId needs to be a string")
        .isLength({min:24, max:24}).withMessage("The userId needs to be 24 charaters in length.")
    ]
}

const validateNewUser = () => {
    return[
        body('userId')
        .isString().withMessage("The userId needs to be a string")
        .isLength({min:24, max:24}).withMessage("The userId needs to be 24 charaters in length."),

        body('googleId')
        .isString().withMessage("The googleId needs to be a string"),

        body('displayName')
        .isString().withMessage("The displayName needs to be a string"),

        body('firstName')
        .isString().withMessage("The firstName needs to be a string")
        .notEmpty().withMessage("First Name can not be empty."),

        body('lastName')
        .isString().withMessage("The lastName needs to be a string")
        .notEmpty().withMessage("Last Name can not be empty."),

        body('email')
        .isString().withMessage("The email needs to be a string")
        .isEmail().withMessage("The email needs to be valid.")
        .notEmpty().withMessage("The email can not be empty.")
    ]
}

const validateUpdateUser = () => {
    return[
        body('firstName')
        .isString().withMessage("firstName must be a string")
        .notEmpty().withMessage("firstName must not be empty."),

        body('lastName')
        .isString().withMessage("lastName must be a string")
        .notEmpty().withMessage("lastName must not be empty."),

        body('email')
        .isString().withMessage("email must be a string")
        .notEmpty().withMessage("email must not be empty."),
    ]
}

module.exports = {
    validateUserId, validateNewUser, validateUpdateUser
};