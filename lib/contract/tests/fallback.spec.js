const Entity = require('../entity');
const Fallback = require('../fallback');
const { TYPES } = require('../../constants');

describe('Fallback', () => {
    let defaultFallback;

    beforeEach(() => {
        defaultFallback = {
            type: TYPES.FALLBACK,
        };
    });

    it('should create an instance', () => {
        const fallback = new Fallback(defaultFallback);
        expect(fallback).toBeInstanceOf(Fallback);
        expect(fallback).toBeInstanceOf(Entity);
        expect(fallback.name).toBe('Fallback');
        expect(fallback.type).toBe(TYPES.FALLBACK);
        expect(fallback.attributes).toEqual([]);
    });

    it('should create an instance with payable attribute', () => {
        defaultFallback.payable = true;
        const fallback = new Fallback(defaultFallback);
        expect(fallback.attributes).toEqual(['payable']);
    });

    it('should throw on creating an instance with invalid type', () => {
        defaultFallback.type = TYPES.METHOD;
        expect(() => new Fallback(defaultFallback)).toThrow();
    });

    describe('get fullName', () => {
        it('should return "Fallback"', () => {
            const fallback = new Fallback(defaultFallback);
            expect(fallback.fullName).toBe('Fallback');
        });
    });

    describe('get signature', () => {
        it('should return "Fallback"', () => {
            const fallback = new Fallback(defaultFallback);
            expect(fallback.signature).toBeUndefined();
        });
    });
});
