const Joi = require('@hapi/joi');

const input = Joi.object().keys({
    name: Joi.string().allow(''),
    type: Joi.string().required(),
    indexed: Joi.boolean(),
    description: Joi.string().allow(''),
    index: Joi.number(),
    order: Joi.number(),
});

module.exports = input;
