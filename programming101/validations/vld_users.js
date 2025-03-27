const bcrypt = require('bcrypt');
const Joi = require('joi');
const validateUser = (user) => {
    const schema = Joi.object({
        email:Joi.string().email().required(),
        username:Joi.string().required(),
    })
}