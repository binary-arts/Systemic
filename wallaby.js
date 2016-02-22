/* eslint-env node */

const babel = require('babel');

module.exports = function(wallaby) {
    return {
        files: [
            { pattern: 'node_modules/requirejs/require.js', instrument: false },
            { pattern: 'node_modules/babel/node_modules/babel-core/browser-polyfill.js', instrument: false },
            { pattern: 'node_modules/babel/node_modules/babel-core/external-helpers.js', instrument: false },
            { pattern: 'node_modules/whatwg-fetch/fetch.js', instrument: false },
            { pattern: 'test/res/**/*.json', instrument: false, load: false },
            { pattern: 'src/**/*.js', load: false },
            { pattern: 'test/wallaby.runner.js', instrument: false }
        ],

        tests: [
            { pattern: 'test/spec/**/*.js', load: false }
        ],

        compilers: {
            'src/**/*.js': wallaby.compilers.babel({
                babel,
                comments: false,
                externalHelpers: true,
                modules: 'amd',
                sourceMap: 'inline',
                stage: 0
            }),
            'test/spec/**/*.js':  wallaby.compilers.babel({
                babel,
                comments: false,
                externalHelpers: true,
                modules: 'amd',
                sourceMap: 'inline',
                stage: 0
            })
        }
    };
}