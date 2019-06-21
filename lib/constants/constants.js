const TYPES = {
    METHOD: 'function',
    EVENT: 'event',
    CONSTRUCTOR: 'constructor',
    FALLBACK: 'fallback',
};

const DEFAULT_ARGV = {
    SRC: './build/contracts',
    DEST: './docs',
    EXCLUDE: [],
    INCLUDE: [],
};

module.exports = {
    TYPES,
    DEFAULT_ARGV,
};
