const Joi = require('@hapi/joi');

const devdocItem = Joi.object().keys({
    params: Joi.object({
        arg: Joi.string(),
        value: Joi.string(),
    }).pattern(Joi.string(), Joi.string()),
    details: Joi.string(),
    return: Joi.string(),
});

module.exports = devdocItem;
