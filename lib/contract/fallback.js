const Entity = require('./entity');
const { TYPES } = require('../constants');

/**
 * Creates a new contract fallback.
 * @class
 */
class Fallback extends Entity {
    /**
     * @param {Object} fallback - contract fallback
     * @param {type} fallback.type - the fallback type (must be fallback)
     * @param {boolean} fallback.payable - the fallback payable attribute
     */
    constructor(fallback) {
        if (fallback.type !== TYPES.FALLBACK) throw new Error('invalid constructor');
        super(fallback);
        const {
            payable,
        } = fallback;
        this.name = 'Fallback';
        this.attributes = [
            payable ? 'payable' : undefined,
        ].filter(Boolean);
    }

    /**
     * @notice returns fallback string
     * @return {string} fallback
     */
    get fullName() {
        const { name } = this;
        return name;
    }

    /**
     * @notice returns fallback signature (undefined)
     * @return {undefined}
     */
    // eslint-disable-next-line class-methods-use-this
    get signature() {
        return undefined;
    }
}

module.exports = Fallback;
