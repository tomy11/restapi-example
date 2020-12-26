const Joi = require('joi');

const registerValidator = async data => {
    
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    });

    return await schema.validateAsync(data);
}

const singinValidator = async data => {
    //console.log(data);
    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    });

    return await schema.validateAsync(data);
}

module.exports = {registerValidator,singinValidator}