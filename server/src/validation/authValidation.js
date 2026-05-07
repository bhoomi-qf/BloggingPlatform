const Joi = require('joi');

exports.registerSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('admin', 'author', 'reader').default('reader'),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'any.only': 'Confirm password must match password',
    }),
});

exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});