const Test = require('./Test');
const TestWithComments = require('./TestWithComments');
const TestWithEvents = require('./TestWithEvents');
const TestWithFallback = require('./TestWithFallback');
const NoContract = require('./NoContract');

const { stringify } = JSON;

module.exports = {
    'TestContract.json': stringify(Test),
    'TestContractWithComments.json': stringify(TestWithComments),
    'TestContractWithEvents.json': stringify(TestWithEvents),
    'TestContractWithFallback.json': stringify(TestWithFallback),
    'NoContract.json': stringify(NoContract),
};
