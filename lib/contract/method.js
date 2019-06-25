const Joi = require('@hapi/joi');
const Entity = require('./entity');
const inputSchema = require('./schema/input');
const { TYPES } = require('../constants');

/**
 * Creates a new contract fallback.
 * @class
 */
class Method extends Entity {
    /**
     * @param {Object} method - contract method
     * @param {string} method.name - the method's name
     * @param {string} method.type - the method's type (must be event)
     * @param {Object[]} [method.inputs] - the method's inputs
     * @param {string} [method.inputs[].name] - the input's name
     * @param {string} [method.inputs[].type] - the input's type
     * @param {Object} [method.params] - the method's inputs description by input name as key
     * @param {Object[]} [method.outputs] - the method's outputs
     * @param {string} [method.outputs[].name] - the output's name
     * @param {string} [method.outputs[].type] - the output's type
     * @param {string} [method.return] - the method's output description
     * @param {boolean} [method.constant] - the method's constant attribute
     * @param {boolean} [method.payable] - the method's payable attribute
     * @param {string} [method.notice] - the method's description
     * @param {string} [method.details] - the method's dev details
     */
    constructor(method) {
        if (method.type !== TYPES.METHOD) throw new Error('invalid method');
        Joi.assert(method.name, Joi.string().required());
        super(method);
        const {
            inputs,
            params,
            outputs,
            constant,
            payable,
            notice,
            details,
            return: result,
        } = method;
        this.params = params;
        this.inputs = inputs;
        this.outputs = outputs;
        this.notice = notice;
        this.details = details;
        this.result = result;
        this.attributes = [
            constant ? 'constant' : undefined,
            payable ? 'payable' : undefined,
        ].filter(Boolean);
    }

    /**
     * @notice gets first 4 bytes from the method's signature
     * @return {string} first 4 bytes from the method's signature
     */
    get signature() {
        return super.signature.slice(0, 10);
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
        const { params } = this;
        const inputs = super.inputs;
        return inputs.map(input => ({
            ...input,
            description: params ? params[input.name] : undefined,
        }));
    }

    /**
     * @notice sets outputs array
     * @param {Object[]} [outputs] - the event's outputs
     * @param {string} [outputs[].name] - the output's name
     * @param {string} [outputs[].type] - the output's type
     */
    set outputs(outputs = []) {
        Joi.assert(outputs, Joi.array().items(inputSchema));
        this._outputs = outputs.map(output => ({
            ...output,
        }));
    }

    /**
     * @notice gets outputs output
     * @return {Object[]} outputs output modified with index and order num
     */
    get outputs() {
        const { _outputs } = this;
        return _outputs.map((output, i) => (({
            ...output,
            index: i,
            order: i + 1,
        })));
    }
}

module.exports = Method;
