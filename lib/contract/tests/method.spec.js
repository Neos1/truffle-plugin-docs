const { keccak256, bufferToHex } = require('ethereumjs-util');
const Entity = require('../entity');
const Method = require('../method');
const { TYPES } = require('../../constants');

describe('Method', () => {
    let defaultMethod;

    beforeEach(() => {
        defaultMethod = {
            name: 'test',
            type: TYPES.METHOD,
            inputs: [{
                type: 'uint256',
                name: 'test',
            }],
            outputs: [{
                type: 'uint256',
                name: 'test',
            }],
            params: {
                test: 'test description',
            },
            notice: 'test notice',
            details: 'test details',
            return: 'test return',
        };
    });

    it('should create an instance', () => {
        const method = new Method(defaultMethod);
        expect(method).toBeInstanceOf(Method);
        expect(method).toBeInstanceOf(Entity);
        expect(method.name).toBe('test');
        expect(method.type).toBe(TYPES.METHOD);
        expect(method.inputs).toEqual([{
            components: [],
            index: 0,
            order: '1',
            name: 'test',
            type: 'uint256',
            description: 'test description',
            stack: [],
        }]);
        expect(method.outputs).toEqual([{
            index: 0,
            order: 1,
            name: 'test',
            type: 'uint256',
        }]);
        expect(method.result).toBe('test return');
        expect(method.notice).toBe('test notice');
        expect(method.details).toBe('test details');
    });

    it('should create an instance with payable attribute', () => {
        defaultMethod.payable = true;
        const method = new Method(defaultMethod);
        expect(method.attributes).toEqual(['payable']);
    });

    it('should create an instance with payable and constant attributes', () => {
        defaultMethod.payable = true;
        defaultMethod.constant = true;
        const method = new Method(defaultMethod);
        expect(method.attributes).toEqual(['constant', 'payable']);
    });

    it('should throw on creating an instance without provided name', () => {
        delete defaultMethod.name;
        expect(() => new Method(defaultMethod)).toThrow(new Error('"value" is required'));
    });

    it('should throw on creating an instance with invalid type', () => {
        defaultMethod.type = TYPES.EVENT;
        expect(() => new Method(defaultMethod)).toThrow();
    });

    it('should throw on creating an instance with invalid inputs data', () => {
        defaultMethod.inputs[0].type = '';
        expect(() => new Method(defaultMethod)).toThrow();
    });

    it('should throw on creating an instance with invalid outputs data', () => {
        defaultMethod.outputs[0].type = '';
        expect(() => new Method(defaultMethod)).toThrow();
    });

    describe('get inputs', () => {
        it('should return correct inputs data', () => {
            const method = new Method(defaultMethod);
            expect(method.inputs).toEqual([{
                components: [],
                index: 0,
                order: '1',
                name: 'test',
                type: 'uint256',
                description: 'test description',
                stack: [],
            }]);
        });
    });

    describe('set inputs', () => {
        it('should set new inputs', () => {
            const method = new Method(defaultMethod);
            method.inputs = [{
                name: 'test1',
                type: 'uint256',
            }, {
                type: 'bool',
            }];
            expect(method.inputs).toEqual([{
                components: [],
                index: 0,
                order: '1',
                name: 'test1',
                type: 'uint256',
                description: undefined,
                stack: [],
            }, {
                components: [],
                index: 1,
                order: '2',
                type: 'bool',
                description: undefined,
                stack: [],
            }]);
        });

        it('should reset inputs on setting\'em as []', () => {
            const method = new Method(defaultMethod);
            method.inputs = [];
            expect(method.inputs).toEqual([]);
        });

        it('should reset inputs on setting\'em as undefined', () => {
            const method = new Method(defaultMethod);
            method.inputs = undefined;
            expect(method.inputs).toEqual([]);
        });

        it('should set inputs without description', () => {
            defaultMethod.params = undefined;
            const method = new Method(defaultMethod);
            expect(method.inputs).toEqual([{
                components: [],
                index: 0,
                order: '1',
                name: 'test',
                type: 'uint256',
                description: undefined,
                stack: [],
            }]);
        });

        it('should throw on setting invalid inputs data', () => {
            const method = new Method(defaultMethod);
            expect(() => {
                method.inputs = [{
                    name: 'test',
                }];
            }).toThrow();
        });
    });

    describe('set outputs', () => {
        it('should set new outputs', () => {
            const method = new Method(defaultMethod);
            method.outputs = [{
                name: 'test1',
                type: 'uint256',
            }, {
                type: 'bool',
            }];
            expect(method.outputs).toEqual([{
                index: 0,
                order: 1,
                name: 'test1',
                type: 'uint256',
            }, {
                index: 1,
                order: 2,
                type: 'bool',
            }]);
        });

        it('should reset outputs on setting\'em as []', () => {
            const method = new Method(defaultMethod);
            method.outputs = [];
            expect(method.outputs).toEqual([]);
        });

        it('should reset outputs on setting\'em as undefined', () => {
            const method = new Method(defaultMethod);
            method.outputs = undefined;
            expect(method.outputs).toEqual([]);
        });

        it('should throw on setting invalid outputs data', () => {
            const method = new Method(defaultMethod);
            expect(() => {
                method.outputs = [{
                    name: 'test',
                }];
            }).toThrow();
        });
    });

    describe('get signature', () => {
        it('should return correct method signature', () => {
            const method = new Method(defaultMethod);
            expect(method.signature).toBe(bufferToHex(keccak256('test(uint256)')).slice(0, 10));
        });
    });
});
