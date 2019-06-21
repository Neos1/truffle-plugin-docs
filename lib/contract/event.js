const Entity = require('./entity');

class Event extends Entity {
    constructor(entity) {
        if (entity.type !== 'event') throw new Error('invalid event');
        super(entity);
        const { inputs } = entity;
        this.inputs = inputs;
    }

    set inputs(inputs = []) {
        this._inputs = inputs;
    }

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
