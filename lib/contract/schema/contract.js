const Joi = require('@hapi/joi');
const abiItem = require('./abiItem');
const devdocItem = require('./devdocItem');
const userdocItem = require('./userdocItem');

const schema = Joi.object().keys({
    contractName: Joi.string().required(),
    abi: Joi.array()
        .items(abiItem)
        .required(),
    compiler: Joi.object()
        .keys({
            name: Joi.string(),
            version: Joi.string(),
        })
        .required(),
    devdoc: Joi.object()
        .keys({
            details: Joi.string(),
            methods: Joi.object().pattern(Joi.string(), devdocItem),
            title: Joi.string(),
        })
        .unknown(true)
        .required(),
    userdoc: Joi.object().required().keys({
        notice: Joi.string(),
        methods: Joi.object().pattern(Joi.string(), [userdocItem, Joi.string()]),
    }),
}).unknown(true);

module.exports = schema;
