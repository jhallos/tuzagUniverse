const Validator = require('validator')

module.exports = function(data) {
    let errors = {}

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required'
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required'
    }
    if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password must be 6-30 characters long'
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}