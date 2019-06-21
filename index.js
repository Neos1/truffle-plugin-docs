const { package: { packageVersion } } = require('./package.json');
const generateDocs = require('./lib/generate-docs');
const { DEFAULT_ARGV } = require('./lib/constants');

const { log } = console;

module.exports = async (config) => {
    const {
        h, help,
        contracts_build_directory: src,
        d, dest,
        e, exclude,
        i, include,
        v, version,
    } = config;

    if (h || help) {
        log([
            'Usage: truffle run docs [options]',
            '',
            'Options',
            '-v, --version                          output the version number',
            '-e, --exclude "<file>, [file...]"      exclude specified files from documentation generation',
            '-i, --include "<file>, [file...]"      include only specified files for documentation generation',
            '-d, --dest "<directory>"               generate docs to dest directory (default: "./docs")',
        ].join('\r\n'));
        return Promise.resolve();
    }

    if (v || version) {
        log(packageVersion);
        return Promise.resolve();
    }

    return generateDocs({
        src,
        dest: dest || d || DEFAULT_ARGV.DEST,
        exclude: exclude || e || DEFAULT_ARGV.EXCLUDE,
        include: include || i || DEFAULT_ARGV.INCLUDE,
    });
};
