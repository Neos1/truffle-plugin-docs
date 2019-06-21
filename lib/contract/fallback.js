const Entity = require('./entity');

class Fallback extends Entity {
    constructor(entity) {
        if (entity.type !== 'fallback') throw new Error('invalid constructor');
        super(entity);
        const {
            payable,
        } = entity;
        this.name = 'Fallback';
        this.attributes = [
            payable ? 'payable' : undefined,
        ].filter(item => !!item);
    }

    get fullName() {
        const { name } = this;
        return name;
    }

    // eslint-disable-next-line class-methods-use-this
    get signature() {
        return undefined;
    }
}

module.exports = Fallback;
