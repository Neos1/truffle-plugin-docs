const readDirRecursively = require('recursive-readdir');

/**
 * @notice makes readDirRecursively function to return a promise
 * @param {string} path - directory to read file list
 * @param {string[]|function[]} array of strings or functions to exclude files from list
 * @return {Promise<string[]>} file list
 */
const readDirRecursivelyWithPromise = (...args) => (
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

module.exports = readDirRecursivelyWithPromise;
