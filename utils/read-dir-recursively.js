const readDirRecursively = require('recursive-readdir');

module.exports = (...args) => (
    new Promise((resolve, reject) => {
        readDirRecursively(...args, (err, files) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(files);
        });
    })
);
