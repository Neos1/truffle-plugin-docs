const Joi = require('@hapi/joi');

const abiItem = Joi.object().keys({
    constant: Joi.boolean(),
    anonymous: Joi.boolean(),
    inputs: Joi.array().items(Joi.object().keys({
        name: Joi.string().allow(''),
        type: Joi.string(),
        indexed: Joi.boolean(),
    })),
    name: Joi.string().allow(''),
    outputs: Joi.array().items(Joi.object().keys({
        name: Joi.string().allow(''),
        type: Joi.string(),
    })),
    payable: Joi.boolean(),
    stateMutability: Joi.string(),
    type: Joi.string(),
});

module.exports = abiItem;
