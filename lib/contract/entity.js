const Joi = require('@hapi/joi');
const { keccak256, bufferToHex } = require('ethereumjs-util');
const entitySchema = require('./schema/entity');
const inputSchema = require('./schema/input');

/**
 * Creates a new contract entity.
 * @class
 */
class Entity {
    /**
     * @param {Object} entity - contract entity
     * @param {string} entity.name - the entity's name
     * @param {string} entity.type - the entity's type
     * @param {Object[]} [entity.inputs] - the entity's inputs
     * @param {string} [entity.inputs[].name] - the input's name
     * @param {string} [entity.inputs[].type] - the input's type
     * @param {string} [entity.inputs[].indexed] - the input's indexed flag for events
     */
    constructor(entity) {
        Joi.assert(entity, entitySchema);
        const { name, type } = entity;
        this.name = name;
        this.type = type;
    }

    /**
     * @notice concatenates entity's name and inputs
     * @static
     * @param {string} name - the entity's name
     * @param {Object[]} [inputs] - the entity's inputs
     * @param {string} [inputs[].name] - the input's name
     * @param {string} [inputs[].type] - the input's type
     * @param {string} [inputs[].indexed] - the input's indexed flag for events
     * @return {string} entity's full name (concatenated name and inputs)
     */
    static fullName(name, inputs = []) {
        Joi.assert(name, Joi.string().required());
        Joi.assert(inputs, Joi.array().items(inputSchema));
        return `${name}(${inputs.map(input => input.type).join(',')})`;
    }

    /**
     * @notice concatenates entity's name and inputs
     * @return {string} the entity's full name (concatenated name and inputs)
     */
    get fullName() {
        const { name, inputs } = this;
        return Entity.fullName(name, inputs);
    }

    /**
     * @notice gets the entity's signature
     * @return {string} the entity's signature
     */
    get signature() {
        const { fullName } = this;
        return bufferToHex(keccak256(fullName));
    }
}

module.exports = Entity;
