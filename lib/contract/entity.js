const Joi = require('@hapi/joi');
const { keccak256, bufferToHex } = require('ethereumjs-util');
const entitySchema = require('./schema/entity');
const inputSchema = require('./schema/input');

const defaultInput = {
    name: undefined,
    type: undefined,
    components: [],
    stack: [],
};

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
        const { name, type, inputs } = entity;
        this.inputs = inputs;
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
    static fullName(name, inputs) {
        Joi.assert(name, Joi.string().required());
        return `${name}${Entity._concatenateInputs(inputs)}`;
    }

    /**
     * @notice concatenates input types into string, handles tuples
     * @static
     * @private
     * @param  {Object[]} inputs - array of base input objects
     * @return {String} concatenated inputs types
     */
    static _concatenateInputs(inputs = []) {
        Joi.assert(inputs, Joi.array().items(inputSchema));
        const output = inputs.map((input) => {
            if (input.components && input.components.length) {
                return Entity._concatenateInputs(input.components);
            }
            return input.type;
        });
        return `(${output.join(',')})`;
    }

    /**
     * @notice modifies provided input object, handles nested inputs
     * @static
     * @private
     * @param  {Object[]} inputs - array of base input objects
     * @param  {Object} def - result object template
     * @param  {Number} stack - stack depth
     * @return {Object} modified input with handled nested inputs
     */
    static _handleInputs(inputs = [], def = defaultInput, stack = 0, parentOder = '') {
        const level = stack + 1;
        return inputs.map((input, i) => {
            const order = `${parentOder}${parentOder ? '.' : ''}${i + 1}`;
            return {
                ...defaultInput,
                ...input,
                order,
                index: i,
                stack: [...Array(level)].map(Number.call, Number),
                components: Entity._handleInputs(input.components, def, level, order),
            };
        });
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

    /**
     * @notice sets inputs array
     * @param {Object[]} [inputs] - the event's inputs
     * @param {string} [inputs[].name] - the input's name
     * @param {string} [inputs[].type] - the input's type
     * @param {string} [inputs[].indexed] - the input's indexed flag for events
     */
    set inputs(inputs = []) {
        Joi.assert(inputs, Joi.array().items(inputSchema));
        this._inputs = inputs;
    }

    /**
     * @notice gets inputs output
     * @return {Object[]} inputs output modified with index and order num
     */
    get inputs() {
        const { _inputs: inputs } = this;
        return Entity._handleInputs(inputs);
    }
}

module.exports = Entity;
