const { keccak256, bufferToHex } = require('ethereumjs-util');
const Entity = require('../entity');
const { TYPES } = require('../../constants');

describe('Entity', () => {
    let defaultEntity;

    beforeEach(() => {
        defaultEntity = {
            name: '',
            type: TYPES.METHOD,
        };
    });

    it('should create an instance', () => {
        const entity = new Entity(defaultEntity);
        expect(entity).toBeInstanceOf(Entity);
        expect(entity.name).toBeDefined();
        expect(entity.type).toBe(TYPES.METHOD);
    });

    it('should create an instance without provided name', () => {
        delete defaultEntity.name;
        const entity = new Entity(defaultEntity);
        expect(entity).toBeInstanceOf(Entity);
        expect(entity.name).toBeUndefined();
        expect(entity.type).toBe(TYPES.METHOD);
    });

    it('should throw on creating an instance with no provided data', () => {
        expect(() => new Entity()).toThrow(new Error('"value" is required'));
    });

    it('should throw on creating an instance with invalid inputs param', () => {
        defaultEntity.inputs = 'string';
        expect(() => new Entity(defaultEntity)).toThrow();
    });

    it('should throw on setting invalid inputs', () => {
        const entity = new Entity(defaultEntity);
        expect(() => { entity.inputs = 'test'; }).toThrow('"value" must be an array');
    });

    describe('static fullName', () => {
        it('should return correct entity full name', () => {
            const fullNameWithNoInputs = Entity.fullName('test', []);
            const fullName = Entity.fullName('test', [{ type: 'uint256' }]);
            expect(fullNameWithNoInputs).toBe('test()');
            expect(fullName).toBe('test(uint256)');
        });

        it('should throw on no name provided', () => {
            expect(() => Entity.fullName()).toThrow('"value" is required');
        });

        it('should throw on invalid inputs provided', () => {
            expect(() => Entity.fullName('test', 'test')).toThrow('"value" must be an array');
        });
    });

    describe('get fullName', () => {
        it('should return correct entity full name', () => {
            defaultEntity.name = 'test';
            const entity = new Entity(defaultEntity);
            expect(entity.fullName).toBe('test()');
        });

        it('should throw on invalid name provided', () => {
            const entity = new Entity(defaultEntity);
            expect(() => entity.fullName).toThrow('"value" is not allowed to be empty');
        });
    });

    describe('get signature', () => {
        it('should return correct entity signature', () => {
            defaultEntity.name = 'test';
            const entity = new Entity(defaultEntity);
            expect(entity.signature).toBe(bufferToHex(keccak256('test()')));
        });

        it('should throw on invalid name provided', () => {
            const entity = new Entity(defaultEntity);
            expect(() => entity.signature).toThrow('"value" is not allowed to be empty');
        });
    });

    describe('static _concatenateInputs', () => {
        const simple = [
            { type: 'uint256' },
            { type: 'bool' },
        ];

        const nested = [
            { type: 'uint256' },
            {
                type: 'tuple',
                components: [
                    { type: 'bool' },
                    { type: 'string' },
                ],
            },
        ];

        it('should return "()" on no params provided', () => {
            const str = Entity._concatenateInputs();
            expect(str).toBe('()');
        });

        it('should return correct concatenated inputs', () => {
            const str = Entity._concatenateInputs(simple);
            expect(str).toBe('(uint256,bool)');
        });

        it('should return correct concatenated nested inputs', () => {
            const str = Entity._concatenateInputs(nested);
            expect(str).toBe('(uint256,(bool,string))');
        });
    });

    describe('static _handleInputs', () => {
        const simple = [
            { type: 'uint256' },
            { type: 'bool' },
        ];

        const nested = [
            { type: 'uint256' },
            {
                type: 'tuple',
                components: [
                    { type: 'bool' },
                    { type: 'string' },
                ],
            },
        ];

        it('should return empty array on no params provided', () => {
            const str = Entity._handleInputs();
            expect(str).toEqual([]);
        });

        it('should modify provided inputs', () => {
            const str = Entity._handleInputs(simple);
            expect(str).toEqual([{
                components: [],
                index: 0,
                name: undefined,
                order: '1',
                type: simple[0].type,
                stack: [0],
            }, {
                components: [],
                index: 1,
                name: undefined,
                order: '2',
                type: simple[1].type,
                stack: [0],
            }]);
        });

        it('should modify provided nested inputs', () => {
            const str = Entity._handleInputs(nested);
            expect(str).toEqual([{
                components: [],
                index: 0,
                name: undefined,
                order: '1',
                type: nested[0].type,
                stack: [0],
            }, {
                index: 1,
                name: undefined,
                order: '2',
                type: nested[1].type,
                stack: [0],
                components: [{
                    components: [],
                    index: 0,
                    name: undefined,
                    order: '2.1',
                    type: nested[1].components[0].type,
                    stack: [0, 1],
                }, {
                    components: [],
                    index: 1,
                    name: undefined,
                    order: '2.2',
                    type: nested[1].components[1].type,
                    stack: [0, 1],
                }],
            }]);
        });
    });
});
