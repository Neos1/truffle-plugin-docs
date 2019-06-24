const Test = require('./Test');
const TestWithNoComments = require('./TestWithNoComments');
const NoContract = require('./NoContract');

const { stringify } = JSON;

module.exports = {
    'TestContract.json': stringify(Test),
    'TestContractWithNoComments.json': stringify(TestWithNoComments),
    'NoContract.json': stringify(NoContract),
};
