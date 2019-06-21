const path = require('path');
const JsonDoc = require('./contract');
const readDirRecursively = require('./../utils/read-dir-recursively');

module.exports = ({
    src = '',
    dest = '',
    exclude = [],
    include = [],
}) => (
    readDirRecursively(src, [file => path.extname(file) !== '.json'])
        .then(files => files.filter(file => exclude.indexOf(path.basename(file)) === -1))
        .then(files => (
            files.filter(file => !include.length || include.indexOf(path.basename(file)) !== -1)
        ))
        .then(files => files.map(file => new JsonDoc(file).save(dest)))
);
