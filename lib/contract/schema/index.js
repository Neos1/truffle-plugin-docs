const contract = require('./contract');
const abiItem = require('./abiItem');
const devdocItem = require('./devdocItem');
const userdocItem = require('./userdocItem');

module.exports = {
    default: contract,
    contract,
    abiItem,
    devdocItem,
    userdocItem,
};
