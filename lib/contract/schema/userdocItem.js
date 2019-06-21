const Joi = require('@hapi/joi');

const userdocItem = Joi.object().keys({
    notice: Joi.string(),
});

module.exports = userdocItem;
