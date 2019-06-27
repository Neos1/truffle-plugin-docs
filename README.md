# truffle-plugin-docs
Generates simple markdown documentation for solidity contracts from truffle build .json files

## Usage
1. Install the plugin from NPM.
```
npm i --save-dev @neos1/truffle-plugin-docs
```
2. Add a plugins section to your Truffle config.
```
module.exports = {
  /* ... rest of truffle-config */

  plugins: [
    "truffle-plugin-docs"
  ]
}
```
3. Run the command
```
truffle compile
truffle run docs
```

## Help output
```
Usage:
truffle run docs [options]

Options:
-v, --version                          output the version number
-e, --exclude "<file>, [file...]"      exclude specified files from documentation generation
-i, --include "<file>, [file...]"      include only specified files for documentation generation
-d, --dest "<directory>"               generate docs to dest directory (default: "./docs")
```