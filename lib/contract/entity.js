const { keccak256, bufferToHex } = require('ethereumjs-util');

class Entity {
    constructor(entity) {
        const { name, type } = entity;
        this.name = name;
        this.type = type;
    }

    static fullName(name = '', inputs = []) {
        return `${name}(${inputs.map(input => input.type).join(',')})`;
    }

    get fullName() {
        const { name, inputs } = this;
        return Entity.fullName(name, inputs);
    }

    get signature() {
        const { fullName } = this;
        return bufferToHex(keccak256(fullName));
    }
}

module.exports = Entity;
