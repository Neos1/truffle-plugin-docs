const contractMocks = require('./contracts');

const fs = jest.genMockFromModule('fs');

const readFileSync = file => contractMocks[file];
const writeFileSync = () => true;

fs.readFileSync = readFileSync;
fs.writeFileSync = writeFileSync;

module.exports = fs;
