const Joi = require('@hapi/joi');
const { TYPES } = require('../../constants');
const input = require('./input');

const entity = Joi.object().keys({
    name: Joi.string().allow(''),
    type: Joi.string().valid(Object.values(TYPES)).required(),
    inputs: Joi.array().items(input).default([]),
})
    .required()
    .unknown(true);
module.exports = entity;
