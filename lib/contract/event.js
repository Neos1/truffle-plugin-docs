const Joi = require('@hapi/joi');
const Entity = require('./entity');
const inputSchema = require('./schema/input');
const { TYPES } = require('../constants');

/**
 * Creates a new contract event.
 * @class
 */
class Event extends Entity {
    /**
     * @param {Object} event - contract event
     * @param {string} event.name - the event's name
     * @param {string} event.type - the event's type (must be event)
     * @param {Object[]} event.inputs - the event's inputs
     * @param {string} event.inputs[].name - the input's name
     * @param {string} event.inputs[].type - the input's type
     * @param {string} event.inputs[].indexed - the input's indexed flag for events
     */
    constructor(event) {
        if (event.type !== TYPES.EVENT) throw new Error('invalid event');
        const { inputs, name } = event;
        Joi.assert(name, Joi.string().required());
        super(event);
        this.inputs = inputs;
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
        const { _inputs } = this;
        return _inputs.map((input, i) => (({
            ...input,
            index: i,
            order: i + 1,
        })));
    }
}

module.exports = Event;
