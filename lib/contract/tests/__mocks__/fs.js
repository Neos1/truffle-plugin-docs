const contractMocks = require('./contracts');

const fs = jest.genMockFromModule('fs');

const readFileSync = file => contractMocks[file];
const writeFileSync = () => true;
const existsSync = dir => dir !== '/test';
const mkdirSync = dir => dir !== '/test';

fs.readFileSync = jest.fn((...args) => readFileSync(...args));
fs.writeFileSync = jest.fn((...args) => writeFileSync(...args));
fs.existsSync = jest.fn((...args) => existsSync(...args));
fs.mkdirSync = jest.fn((...args) => mkdirSync(...args));

module.exports = fs;
