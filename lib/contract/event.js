const Joi = require('@hapi/joi');
const Entity = require('./entity');
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
        const { name } = event;
        Joi.assert(name, Joi.string().required());
        super(event);
    }
}

module.exports = Event;
