const fs = require('fs');
const Joi = require('@hapi/joi');
const Mustache = require('mustache');
const { TYPES } = require('../constants');
const { contract: schema } = require('./schema');
const { index, input, output } = require('./template');
const Event = require('./event');
const Method = require('./method');
const Fallback = require('./fallback');
const Constructor = require('./constructor');
const removeLineBreaks = require('../../utils/remove-line-breaks');

/**
 * Creates a new contract documentation.
 * @class
 */
class Contract {
    /**
     * @param {string} file - path to contract .json output
     * @return {Contract} an instance
     */
    constructor(file) {
        this.file = file;
        return this;
    }

    /**
     * @notice reads and parses file
     * @param {string} file path to .json contract file
     */
    set file(file) {
        Joi.assert(file, Joi.string().required(), `invalid file path: ${file}`);
        this._readFile(file);
        this._file = file;
    }

    /**
     * @notice gets .json contract file
     * @return {string} path to .json contract file
     */
    get file() {
        return this._file;
    }

    /**
     * @notice gets .json file content
     * @return {Object} compiled contract data
     */
    get content() {
        const {
            _fileContent: fileContent,
        } = this;
        return fileContent;
    }

    /**
     * @notice gets contract name
     * @return {string} contract name
     */
    get contractName() {
        const { content: { contractName } } = this;
        return contractName;
    }

    /**
     * @notice gets contract title
     * @return {string} contract title
     */
    get title() {
        const { content: { devdoc: { title } } } = this;
        return title;
    }

    /**
     * @notice gets contract notice
     * @return {string} contract notice
     */
    get notice() {
        const { content: { userdoc: { notice } } } = this;
        return notice;
    }

    /**
     * @notice gets contract dev details
     * @return {string} contract dev details
     */
    get details() {
        const { content: { devdoc: { details } } } = this;
        return details;
    }

    /**
     * @notice gets link to top
     * @return {string} lowercase contract name
     */
    get link() {
        return this.contractName.toLowerCase();
    }

    /**
     * @notice gets contract events array
     * @return {Event[]} contract events array
     */
    get events() {
        const { content: { abi } } = this;
        return abi
            .filter(item => item.type === TYPES.EVENT)
            .map(event => new Event(event));
    }

    /**
     * @notice gets contract methods array
     * @return {Method[]} contract methods array
     */
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

    /**
     * @notice gets contract constructor
     * @return {Constructor[]} contract constructor
     */
    get contractConstructor() {
        const { content: { abi, devdoc: dev, userdoc } } = this;
        // object property "constructor" is reserved
        // so it could be function Object
        const devdoc = typeof dev.methods[TYPES.CONSTRUCTOR] === 'function'
            ? {}
            : dev.methods[TYPES.CONSTRUCTOR];
        const notice = typeof userdoc.methods[TYPES.CONSTRUCTOR] === 'function'
            ? undefined
            : userdoc.methods[TYPES.CONSTRUCTOR];
        return abi
            .filter(item => item.type === TYPES.CONSTRUCTOR)
            .map(method => new Constructor({
                ...method,
                ...devdoc,
                notice,
            }))[0];
    }

    /**
     * @notice gets contract fallback
     * @return {Fallback[]} contract fallback
     */
    get fallback() {
        const { content: { abi } } = this;
        return abi
            .filter(item => item.type === TYPES.FALLBACK)
            .map(method => new Fallback({ ...method }))[0];
    }

    /**
     * @notice gets markdown content
     * @return {string} contract documentation as markdown string
     */
    get markdown() {
        const {
            contractName,
            title,
            notice,
            details,
            fallback,
            contractConstructor: constructor,
            events,
            methods,
            link,
        } = this;
        return Mustache.render(
            // template
            index,
            // view
            {
                contractName,
                title,
                notice,
                details,
                fallback,
                constructor,
                events,
                methods,
                link,
            },
            // sub templates
            {
                input,
                output,
            },
        );
    }

    /**
     * @notice saves markdown content to file
     * @param {string} dest - path to save file
     * @return {Contract} an instance
     */
    save(dest) {
        Joi.assert(dest, Joi.string().required());
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

    /**
     * @notice writes provided content to file
     * @private
     * @param {string} file - path to write file
     * @param {string} content - content to write
     */
    // eslint-disable-next-line class-methods-use-this
    _writeFile(file, content) {
        fs.writeFileSync(`${file}.md`, content, {
            encoding: 'utf8',
        });
    }

    /**
     * @notice reads contract data from .json file
     * @private
     * @return file data
     */
    _readFile(file) {
        const { parse } = JSON;
        const content = fs.readFileSync(file, {
            encoding: 'utf8',
        });
        Joi.assert(content, schema, `invalid file content: ${file}`);
        const fileContent = parse(removeLineBreaks(content));
        this._fileContent = fileContent;
        return fileContent;
    }
}

module.exports = Contract;
