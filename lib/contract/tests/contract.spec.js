const Contract = require('../contract');
const TestContract = require('./__mocks__/contracts/Test');
const TestContractWithNoComments = require('./__mocks__/contracts/TestWithNoComments');

jest.mock('fs');

describe('Contract', () => {
    let contract;

    beforeEach(() => {
        contract = new Contract('TestContract.json');
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
            contract.file = 'TestContractWithNoComments.json';
            const { content, file } = contract;
            expect(content).toBeDefined();
            expect(file).toBe('TestContractWithNoComments.json');
            expect(content).toEqual(TestContractWithNoComments);
        });

        it('should throw on invalid file', () => {
            expect(() => { contract.file = 'NoContract.json'; }).toThrow();
        });
    });

    describe('get file', () => {
        it('should return parsed filename', () => {
            expect(contract.file).toBe('TestContract.json');
        });

        it('should do not change file on error', () => {
            expect(() => { contract.file = 'NoContract.json'; }).toThrow();
            expect(contract.file).toBe('TestContract.json');
        });
    });

    describe('get content', () => {
        it('should return file content', () => {
            const { content } = contract;
            expect(content).toBeDefined();
            expect(content).toEqual(TestContract);
        });
    });

    describe('get contractName', () => {
        it('should return contract name', () => {
            const { contractName } = contract;
            expect(contractName).toBe('Test');
        });
    });

    describe('get title', () => {
        it('should return contract title', () => {
            const { title } = contract;
            expect(title).toBe('Test');
        });

        it('should return empty contract title', () => {
            contract.file = 'TestContractWithNoComments.json';
            const { title } = contract;
            expect(title).toBeUndefined();
        });
    });
});
