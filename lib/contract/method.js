const Entity = require('./entity');

class Method extends Entity {
    constructor(entity) {
        if (entity.type === 'event') throw new Error('invalid event');
        super(entity);
        const {
            inputs,
            params,
            outputs,
            constant,
            payable,
            notice,
            details,
            return: result,
        } = entity;
        this.params = params;
        this.inputs = inputs;
        this.outputs = outputs;
        this.notice = notice;
        this.details = details;
        this.result = result;
        this.attributes = [
            constant ? 'constant' : undefined,
            payable ? 'payable' : undefined,
        ].filter(item => !!item);
    }

    get signature() {
        return super.signature.slice(0, 10);
    }

    set inputs(inputs = []) {
        const { params } = this;
        this._inputs = inputs.map(input => ({
            ...input,
            description: params ? params[input.name] : undefined,
        }));
    }

    get inputs() {
        const { _inputs } = this;
        return _inputs.map((input, i) => (({
            ...input,
            index: i,
            order: i + 1,
        })));
    }

    set outputs(outputs = []) {
        this._outputs = outputs.map(output => ({
            ...output,
        }));
    }

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
