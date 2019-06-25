const Entity = require('../entity');
const Constructor = require('../constructor');
const { TYPES } = require('../../constants');

describe('Constructor', () => {
    let defaultConstructor;

    beforeEach(() => {
        defaultConstructor = {
            type: TYPES.CONSTRUCTOR,
            inputs: [{
                type: 'uint256',
                name: 'test',
            }],
        };
    });

    it('should create an instance', () => {
        const contractConstructor = new Constructor(defaultConstructor);
        expect(contractConstructor).toBeInstanceOf(Constructor);
        expect(contractConstructor).toBeInstanceOf(Entity);
        expect(contractConstructor.name).toBe('Constructor');
        expect(contractConstructor.type).toBe(TYPES.CONSTRUCTOR);
        expect(contractConstructor.inputs).toEqual([{
            description: undefined,
            index: 0,
            order: '1',
            name: 'test',
            type: 'uint256',
        }]);
    });

    it('should create an instance ignoring provided name', () => {
        defaultConstructor.name = 'test';
        const contractConstructor = new Constructor(defaultConstructor);
        expect(contractConstructor.name).toBe('Constructor');
    });

    it('should throw on creating an instance with invalid type', () => {
        defaultConstructor.type = TYPES.METHOD;
        expect(() => new Constructor(defaultConstructor)).toThrow();
    });

    it('should throw on creating an instance with invalid inputs data', () => {
        defaultConstructor.inputs[0].type = '';
        expect(() => new Constructor(defaultConstructor)).toThrow();
    });

    describe('get signature', () => {
        it('should return no signature', () => {
            const contractConstructor = new Constructor(defaultConstructor);
            expect(contractConstructor.signature).toBeUndefined();
        });
    });

    describe('get fullName', () => {
        it('should return correct full name', () => {
            const contractConstructor = new Constructor(defaultConstructor);
            expect(contractConstructor.fullName).toBe('constructor(uint256)');
        });
    });

    describe('get inputs', () => {
        it('should return correct inputs data', () => {
            const contractConstructor = new Constructor(defaultConstructor);
            expect(contractConstructor.inputs).toEqual([{
                description: undefined,
                index: 0,
                order: '1',
                name: 'test',
                type: 'uint256',
            }]);
        });
    });

    describe('set inputs', () => {
        it('should set new inputs', () => {
            const contractConstructor = new Constructor(defaultConstructor);
            contractConstructor.inputs = [{
                name: 'test1',
                type: 'uint256',
            }, {
                type: 'bool',
            }];
            expect(contractConstructor.inputs).toEqual([{
                description: undefined,
                index: 0,
                order: '1',
                name: 'test1',
                type: 'uint256',
            }, {
                description: undefined,
                index: 1,
                order: '2',
                type: 'bool',
            }]);
        });

        it('should set new inputs with description', () => {
            const contractConstructor = new Constructor(defaultConstructor);
            contractConstructor.params = {
                test: 'test description',
            };
            expect(contractConstructor.inputs).toEqual([{
                index: 0,
                order: '1',
                name: 'test',
                type: 'uint256',
                description: 'test description',
            }]);
        });

        it('should reset inputs on setting\'em as []', () => {
            const contractConstructor = new Constructor(defaultConstructor);
            contractConstructor.inputs = [];
            expect(contractConstructor.inputs).toEqual([]);
        });

        it('should reset inputs on setting\'em as undefined', () => {
            const contractConstructor = new Constructor(defaultConstructor);
            contractConstructor.inputs = undefined;
            expect(contractConstructor.inputs).toEqual([]);
        });

        it('should throw on setting invalid inputs data', () => {
            const contractConstructor = new Constructor(defaultConstructor);
            expect(() => {
                contractConstructor.inputs = [{
                    name: 'test',
                }];
            }).toThrow();
        });
    });
});
