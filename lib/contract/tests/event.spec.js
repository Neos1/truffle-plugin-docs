const Entity = require('../entity');
const Event = require('../event');
const { TYPES } = require('../../constants');

describe('Event', () => {
    let defaultEvent;

    beforeEach(() => {
        defaultEvent = {
            name: 'test',
            type: TYPES.EVENT,
            inputs: [{
                type: 'uint256',
                name: 'test',
            }],
        };
    });

    it('should create an instance', () => {
        const event = new Event(defaultEvent);
        expect(event).toBeInstanceOf(Event);
        expect(event).toBeInstanceOf(Entity);
        expect(event.name).toBe('test');
        expect(event.type).toBe(TYPES.EVENT);
        expect(event.inputs).toEqual([{
            index: 0,
            order: '1',
            name: 'test',
            type: 'uint256',
        }]);
    });

    it('should throw on creating an instance without provided name', () => {
        delete defaultEvent.name;
        expect(() => new Event(defaultEvent)).toThrow(new Error('"value" is required'));
    });

    it('should throw on creating an instance with invalid type', () => {
        defaultEvent.type = TYPES.METHOD;
        expect(() => new Event(defaultEvent)).toThrow();
    });

    it('should throw on creating an instance with invalid inputs data', () => {
        defaultEvent.inputs[0].type = '';
        expect(() => new Event(defaultEvent)).toThrow();
    });

    describe('get inputs', () => {
        it('should return correct inputs data', () => {
            const event = new Event(defaultEvent);
            expect(event.inputs).toEqual([{
                index: 0,
                order: '1',
                name: 'test',
                type: 'uint256',
            }]);
        });
    });

    describe('set inputs', () => {
        it('should set new inputs', () => {
            const event = new Event(defaultEvent);
            event.inputs = [{
                name: 'test1',
                type: 'uint256',
            }, {
                type: 'bool',
            }];
            expect(event.inputs).toEqual([{
                index: 0,
                order: '1',
                name: 'test1',
                type: 'uint256',
            }, {
                index: 1,
                order: '2',
                type: 'bool',
            }]);
        });

        it('should reset inputs on setting\'em as []', () => {
            const event = new Event(defaultEvent);
            event.inputs = [];
            expect(event.inputs).toEqual([]);
        });

        it('should reset inputs on setting\'em as undefined', () => {
            const event = new Event(defaultEvent);
            event.inputs = undefined;
            expect(event.inputs).toEqual([]);
        });

        it('should throw on setting invalid inputs data', () => {
            const event = new Event(defaultEvent);
            expect(() => {
                event.inputs = [{
                    name: 'test',
                }];
            }).toThrow();
        });
    });
});
