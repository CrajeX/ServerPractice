const bcrypt = require('bcrypt');
const Joi = require('joi');
const validateUser = (user) => {
    const schema = Joi.object({
        email:Joi.string().email().required(),
        username:Joi.string().required(),
        password:Joi.string().required(),
        name:Joi.string().required(),
        role:Joi.string()
    })
    const validate = schema.validate(user)
    return validate
};

module.exports.validateUser = validateUser;

