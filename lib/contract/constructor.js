const Joi = require('@hapi/joi');
const Entity = require('./entity');
const inputSchema = require('./schema/input');
const { TYPES } = require('../constants');

/**
 * Creates a new contract constructor.
 * @class
 */
class Constructor extends Entity {
    /**
     * @param {Object} entity - contract constructor
     * @param {string} entity.type - the method's type (must be constructor)
     * @param {Object[]} [entity.inputs] - the method's inputs
     * @param {string} [entity.inputs[].name] - the input's name
     * @param {string} [entity.inputs[].type] - the input's type
     * @param {Object} [entity.params] - the method's inputs description by input name as key
     * @param {string} [entity.notice] - the method's description
     * @param {string} [entity.details] - the method's dev details
     */
    constructor(entity) {
        if (entity.type !== TYPES.CONSTRUCTOR) throw new Error('invalid constructor');
        super(entity);
        const {
            inputs,
            params,
            notice,
            details,
        } = entity;
        this.params = params;
        this.notice = notice;
        this.details = details;
        this.name = 'Constructor';
        this.inputs = inputs;
    }

    /**
     * @notice returns fallback signature (undefined)
     * @return {undefined}
     */
    // eslint-disable-next-line class-methods-use-this
    get signature() {
        return undefined;
    }

    /**
     * @notice concatenates entity's name and inputs
     * @return {string} the entity's full name (concatenated name and inputs)
     */
    get fullName() {
        const { name, _inputs: inputs } = this;
        return Entity.fullName(
            name.toLowerCase(),
            inputs,
        );
    }

    /**
     * @notice sets inputs array
     * @param {Object[]} [inputs] - the event's inputs
     * @param {string} [inputs[].name] - the input's name
     * @param {string} [inputs[].type] - the input's type
     */
    set inputs(inputs = []) {
        Joi.assert(inputs, Joi.array().items(inputSchema));
        this._inputs = inputs;
    }

    /**
     * @notice gets inputs output
     * @return {Object[]} inputs output modified with index and order num and description
     */
    get inputs() {
        const { _inputs, params } = this;
        return _inputs.map((input, i) => (({
            ...input,
            index: i,
            order: i + 1,
            description: params ? params[input.name] : undefined,
        })));
    }
}

module.exports = Constructor;
