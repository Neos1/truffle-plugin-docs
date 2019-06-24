const Joi = require('@hapi/joi');
const input = require('./input');

const abiItem = Joi.object().keys({
    constant: Joi.boolean(),
    anonymous: Joi.boolean(),
    inputs: Joi.array().items(input),
    name: Joi.string().allow(''),
    outputs: Joi.array().items(input),
    payable: Joi.boolean(),
    stateMutability: Joi.string(),
    type: Joi.string(),
});

module.exports = abiItem;
