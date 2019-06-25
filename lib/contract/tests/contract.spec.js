const fs = require('fs');
const Contract = require('../contract');
const TestContract = require('./__mocks__/contracts/Test');
const TestContractWithComments = require('./__mocks__/contracts/TestWithComments');
const removeLineBreaks = require('../../../utils/remove-line-breaks');
const Event = require('../event');
const Method = require('../method');
const Fallback = require('../fallback');
const Constructor = require('../constructor');

const { stringify, parse } = JSON;
const removeLineBreaksFromObject = obj => parse(removeLineBreaks(stringify(obj)));

jest.mock('fs');

describe('Contract', () => {
    let contract;

    beforeEach(() => {
        contract = new Contract('TestContractWithComments.json');
    });

    it('should create an instance', () => {
        expect(contract).toBeInstanceOf(Contract);
    });

    it('should throw on creating an instance with no file provided', () => {
        expect(() => new Contract()).toThrow();
    });

    it('should throw on creating an instance with invalid contract file', () => {
        expect(() => new Contract('NoContract.json')).toThrow();
    });

    describe('set file', () => {
        it('should read and parse new file', () => {
            contract.file = 'TestContract.json';
            const { content, file } = contract;
            expect(content).toBeDefined();
            expect(file).toBe('TestContract.json');
            expect(content).toEqual(removeLineBreaksFromObject(TestContract));
        });

        it('should throw on invalid file', () => {
            expect(() => { contract.file = 'NoContract.json'; }).toThrow();
        });
    });

    describe('get file', () => {
        it('should return parsed filename', () => {
            expect(contract.file).toBe('TestContractWithComments.json');
        });

        it('should do not change file on error', () => {
            expect(() => { contract.file = 'NoContract.json'; }).toThrow();
            expect(contract.file).toBe('TestContractWithComments.json');
        });
    });

    describe('get content', () => {
        it('should return file content', () => {
            const { content } = contract;
            expect(content).toBeDefined();
            expect(content).toEqual(removeLineBreaksFromObject(TestContractWithComments));
        });
    });

    describe('get contractName', () => {
        it('should return contract name', () => {
            const { contractName } = contract;
            expect(contractName).toBe('TestWithComments');
        });
    });

    describe('get title', () => {
        it('should return contract title', () => {
            const { title } = contract;
            expect(title).toBe('Test');
        });

        it('should return empty contract title', () => {
            contract.file = 'TestContract.json';
            const { title } = contract;
            expect(title).toBeUndefined();
        });
    });

    describe('get notice', () => {
        it('should return contract notice', () => {
            const { notice } = contract;
            expect(notice).toBe('Test contract notice');
        });

        it('should return empty contract notice', () => {
            contract.file = 'TestContract.json';
            const { notice } = contract;
            expect(notice).toBeUndefined();
        });
    });

    describe('get details', () => {
        it('should return contract details', () => {
            const { details } = contract;
            expect(details).toBe('Test contract dev');
        });

        it('should return empty contract details', () => {
            contract.file = 'TestContract.json';
            const { details } = contract;
            expect(details).toBeUndefined();
        });
    });

    describe('get link', () => {
        it('should return anchor to top', () => {
            expect(contract.link).toBe(contract.contractName.toLowerCase());
            contract.file = 'TestContract.json';
            expect(contract.link).toBe(contract.contractName.toLowerCase());
        });
    });

    describe('get events', () => {
        it('should return empty events array', () => {
            const { events } = contract;
            expect(events).toEqual([]);
        });

        it('should return filled events array', () => {
            contract.file = 'TestContractWithEvents.json';
            const { events } = contract;
            expect(events.length).toBe(2);
            events.map(event => expect(event).toBeInstanceOf(Event));
        });
    });

    describe('get methods', () => {
        it('should return filled methods array', () => {
            const { methods } = contract;
            expect(methods.length).toBe(2);
            methods.map(method => expect(method).toBeInstanceOf(Method));
        });
    });

    describe('get fallback', () => {
        it('should return no fallback', () => {
            const { fallback } = contract;
            expect(fallback).toBeUndefined();
        });

        it('should return a fallback', () => {
            contract.file = 'TestContractWithFallback.json';
            const { fallback } = contract;
            const {
                inputs,
                attributes,
                name,
                type,
                signature,
            } = fallback;
            expect(fallback).toBeInstanceOf(Fallback);
            expect(inputs).toEqual([]);
            expect(attributes).toEqual(['payable']);
            expect(name).toBe('Fallback');
            expect(type).toBe('fallback');
            expect(signature).toBeUndefined();
        });
    });

    describe('get contractConstructor', () => {
        it('should return no constructor', () => {
            contract.file = 'TestContract.json';
            const { contractConstructor: constructor } = contract;
            expect(constructor).toBeUndefined();
        });

        it('should return a constructor', () => {
            const { contractConstructor: constructor } = contract;
            const {
                name,
                type,
                signature,
            } = constructor;
            expect(constructor).toBeInstanceOf(Constructor);
            expect(name).toBe('Constructor');
            expect(type).toBe('constructor');
            expect(signature).toBeUndefined();
        });
    });

    describe('get markdown', () => {
        it('should return a markdown content', () => {
            const { markdown } = contract;
            expect(typeof markdown).toBe('string');
        });
    });

    describe('save()', () => {
        it('should call a writeFileSync method', () => {
            const { contractName, markdown } = contract;
            contract.save('/');
            expect(fs.writeFileSync).toHaveBeenCalled();
            expect(fs.writeFileSync).toHaveBeenCalledWith(
                `/${contractName}.md`,
                markdown,
                { encoding: 'utf8' },
            );
        });

        it('should call an existsSync method and mkdirSync method', () => {
            contract.save('/test');
            expect(fs.existsSync).toHaveBeenCalled();
            expect(fs.existsSync).toHaveBeenCalledWith('/test');
            expect(fs.mkdirSync).toHaveBeenCalled();
            expect(fs.mkdirSync).toHaveBeenCalledWith('/test', { recursive: true });
        });

        it('should do not call a mkdirSync method', () => {
            contract.save('/test-no-call');
            expect(fs.existsSync).toHaveBeenCalled();
            expect(fs.existsSync).toHaveBeenCalledWith('/test-no-call');
            expect(fs.mkdirSync).not.toHaveBeenCalled();
        });
    });
});
