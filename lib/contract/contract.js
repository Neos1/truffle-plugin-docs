const fs = require('fs');
const Joi = require('@hapi/joi');
const Mustache = require('mustache');
const { TYPES } = require('../constants');
const { contract: schema } = require('./schema');
const template = require('./template');
const Event = require('./event');
const Method = require('./method');
const Fallback = require('./fallback');
const Constructor = require('./constructor');

class Contract {
    constructor(file) {
        Joi.assert(file, Joi.string(), `invalid file: ${file}`);
        this.file = file;
        return this;
    }

    get content() {
        const { fileContent } = this;
        if (fileContent) return fileContent;
        return this._readFile();
    }

    get contractName() {
        const { content: { contractName } } = this;
        return contractName || '';
    }

    get title() {
        const { content: { devdoc: title } } = this;
        return title;
    }

    get description() {
        const { content: { userdoc: { notice } } } = this;
        return notice;
    }

    get link() {
        return this.contractName.toLowerCase();
    }

    get events() {
        const { content: { abi } } = this;
        return abi
            .filter(item => item.type === TYPES.EVENT)
            .map(event => new Event(event));
    }

    get methods() {
        const { content: { abi, devdoc, userdoc } } = this;
        return abi
            .filter(item => item.type === TYPES.METHOD)
            .map(method => new Method({
                ...method,
                ...devdoc.methods[Method.fullName(method.name, method.inputs)],
                ...userdoc.methods[Method.fullName(method.name, method.inputs)],
            }));
    }

    get contractConstructor() {
        const { content: { abi, devdoc, userdoc } } = this;
        return abi
            .filter(item => item.type === TYPES.CONSTRUCTOR)
            .map(method => new Constructor({
                ...method,
                ...devdoc.methods[Method.constructor],
                notice: userdoc.methods[Method.constructor],
            }));
    }

    get fallback() {
        const { content: { abi } } = this;
        return abi
            .filter(item => item.type === TYPES.FALLBACK)
            .map(method => new Fallback({ ...method }));
    }

    get markdown() {
        const {
            contractName,
            title,
            description,
            fallback,
            contractConstructor: constructor,
            events,
            methods,
            link,
        } = this;
        return Mustache.render(template, {
            contractName,
            title,
            description,
            fallback,
            constructor,
            events,
            methods,
            link,
        });
    }

    save(dest) {
        const { contractName, markdown } = this;
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        this._writeFile(
            `${dest.replace(/\/$/, '')}/${contractName}`,
            markdown,
        );
        return this;
    }

    // eslint-disable-next-line class-methods-use-this
    _writeFile(file, content) {
        fs.writeFileSync(`${file}.md`, content, {
            encoding: 'utf8',
        });
    }

    _readFile() {
        const { parse } = JSON;
        const { file } = this;
        const content = fs.readFileSync(file, {
            encoding: 'utf8',
        });
        Joi.assert(content, schema, `invalid file content: ${file}`);
        const fileContent = parse(content);
        this.fileContent = fileContent;
        return fileContent;
    }
}

module.exports = Contract;
