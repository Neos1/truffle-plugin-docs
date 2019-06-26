const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/index.mustache`, { encoding: 'utf8' });
const input = fs.readFileSync(`${__dirname}/input.mustache`, { encoding: 'utf8' });
const output = fs.readFileSync(`${__dirname}/output.mustache`, { encoding: 'utf8' });

module.exports = {
    index,
    input,
    output,
};
