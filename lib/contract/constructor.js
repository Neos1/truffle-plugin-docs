const Entity = require('./entity');
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
            params,
            notice,
            details,
        } = entity;
        this.params = params;
        this.notice = notice;
        this.details = details;
        this.name = 'Constructor';
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
     * @param {string} [inputs[].indexed] - the input's indexed flag for events
     */
    set inputs(inputs) {
        super.inputs = inputs;
    }

    /**
     * @notice gets inputs output
     * @return {Object[]} inputs output modified with index and order num and description
     */
    get inputs() {
        const inputs = super.inputs;
        return this._addDescriptionToInputs(inputs);
    }

    /**
     * @notice adds description field to all provided inputs
     * @private
     * @return {Object[]} outputs output modified with index and order num
     */
    _addDescriptionToInputs(inputs) {
        const { params } = this;
        return inputs.map(input => ({
            ...input,
            description: params ? params[input.name] : undefined,
            components: this._addDescriptionToInputs(input.components),
        }));
    }
}

module.exports = Constructor;
