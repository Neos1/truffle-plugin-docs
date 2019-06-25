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
});
