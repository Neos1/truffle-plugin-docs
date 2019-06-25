const Joi = require('@hapi/joi');

/**
 * @notice removes line breaks from the provided string
 * @param {string} str - string to remove line breaks from
 * @return {string} modified string
 */
const removeLineBreaks = (str) => {
    Joi.assert(str, Joi.string());
    return str.replace(/(\\r\\n|\\n|\\r)("|')/gm, '$2');
};

module.exports = removeLineBreaks;
