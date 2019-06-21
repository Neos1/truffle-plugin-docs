const Entity = require('./entity');

class Constructor extends Entity {
    constructor(entity) {
        if (entity.type !== 'constructor') throw new Error('invalid constructor');
        super(entity);
        const { inputs } = entity;
        this.inputs = inputs;
        this.name = 'Constructor';
    }

    get fullName() {
        const { name } = this;
        return name;
    }

    // eslint-disable-next-line class-methods-use-this
    get signature() {
        return undefined;
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

module.exports = Constructor;
