/* eslint-env node */

const Path = require('path');

module.exports = grunt => {
    require('load-grunt-tasks')(grunt);

    const pkg = grunt.file.readJSON('package.json');

    const axis = {
        descendentJS: '**/*.js',
        descendentJSON: '**/*.json'
    }

    const dir = {
        coverage: 'test/coverage',
        node: 'node_modules',
        out: 'bin',
        res: 'test/res',
        spec: 'test/spec',
        src: 'src',
        work: 'obj'
    };

    const file = {
        out: {
            debug: Path.join(dir.work, `${pkg.name}.js`),
            min: Path.join(dir.work, `${pkg.name}.min.js`)
        }
    };

    const files = {
        src: Path.join(dir.src, axis.descendentJS),
        spec: Path.join(dir.spec, axis.descendentJS),
        res: Path.join(dir.res, axis.descendentJSON),
        work: Path.join(dir.work, axis.descendentJS)
    };

    const runtime = {
        amd: Path.join(dir.node, 'requirejs/require.js'), //TODO: change to almond
        babel: Path.join(dir.node, 'babel/node_modules/babel-core/external-helpers.js'),
        es7: Path.join(dir.node, 'babel/node_modules/babel-core/browser-polyfill.js'),
        xhr: Path.join(dir.node, 'whatwg-fetch/fetch.js')
    };

    grunt.initConfig({
        babel: {
            compile: {
                cwd: dir.work,
                dest: dir.work,
                expand: true,
                src: axis.descendentJS,
                options: {
                    comments: false,
                    externalHelpers: true,
                    modules: 'amd'
                }
            }
        },
        clean: {
            compile: [dir.work, dir.out],
            pack: [Path.join(dir.work, '**/*'), `!${file.out.debug}`],
            reset: [dir.coverage, dir.node, dir.out, dir.work],
            unit: [dir.coverage]
        },
        copy: {
            compile: {
                cwd: dir.src,
                dest: dir.work,
                expand: true,
                src: axis.descendentJS
            }
        },
        eslint: {
            analyze: {
                cwd: dir.src,
                expand: true,
                src: axis.descendentJS,
                options: {
                    format: 'stylish'
                }
            }
        },
        karma: {
            unit: {
                options: {
                    babelPreprocessor: {
                        options: {
                            comments: false,
                            externalHelpers: true,
                            modules: 'amd',
                            sourceMap: 'inline'
                        }
                    },
                    browsers: ['PhantomJS'],
                    coverageReporter: {
                        dir: dir.coverage,
                        includeAllSources: true,
                        subdir: '.',
                        type : 'lcov'
                    },
                    files: [
                        { pattern: files.src, included: false },
                        { pattern: files.spec, included: false },
                        { pattern: files.res, included: false },
                        { pattern: runtime.es7, included: true },
                        { pattern: runtime.babel, included: true },
                        { pattern: runtime.xhr, included: true },
                        { pattern: 'test/karma.runner.js', included: true }
                    ],
                    frameworks: ['jasmine', 'requirejs'],
                    logLevel: 'OFF', //!!! OFF | WARN
                    preprocessors: (() => {
                        const result = Object.create(null);

                        result[files.src] = ['babel', 'coverage'];
                        result[files.spec] = ['babel'];

                        return result;
                    })(),
                    reporters: ['mocha', 'coverage'],
                    singleRun: true
                }
            }
        },
        rename: {
            build: {
                dest: dir.out,
                src: dir.work
            }
        },
        requirejs: {
            pack: {
                options: {
                    baseUrl: dir.work,
                    name: pkg.name,
                    onBuildWrite(moduleName, path, contents) {
                        return moduleName === pkg.name ? '' : contents.replace(`define('`, `define('${pkg.name}/`);
                    },
                    optimize: 'none',
                    out: file.out.debug,
                    wrap: {
                        start: `(function() {\n${grunt.file.read(runtime.amd)}\n}).call(typeof self !== 'undefined' ? self : this);\n${grunt.file.read(runtime.es7)}\n${grunt.file.read(runtime.babel)}\n${grunt.file.read(runtime.xhr)}\n`
                    }
                }
            }
        },
        'string-replace': {
            min: {
                dest: file.out.debug,
                src: file.out.debug,
                options: {
                    replacements: [{
                        pattern: /_Debug\['default'\]\.assert\(/g,
                        replacement: '//_Debug[\'default\'].assert('
                    }]
                }
            },
            'post-min': {
                dest: file.out.debug,
                src: file.out.debug,
                options: {
                    replacements: [{
                        pattern: /\/\/_Debug\['default'\]\.assert\(/g,
                        replacement: '_Debug[\'default\'].assert('
                    }]
                }
            }
        },
        uglify: {
            options: {
                banner: ['/*! ', pkg.name, ' - v', pkg.version, ' - ', grunt.template.today('yyyy-mm-dd'), ' */\n\n'].join('')
            },
            min: {
                dest: file.out.min,
                src: file.out.debug,
                options: {
                    quoteStyle: 1,
                    sourceMap: true
                }
            },
            pack: {
                dest: file.out.debug,
                src: file.out.debug,
                options: {
                    beautify: {
                        beautify: true,
                        width: 200
                    },
                    compress: false,
                    mangle: false,
                    quoteStyle: 1
                }
            }
        },
        watch: {
            debug: {
                files: [files.src, files.spec],
                tasks: ['build']
            },
            develop: {
                files: [files.src, files.spec],
                tasks: ['test']
            }
        }
    });

    grunt.registerTask('reset', ['clean:reset']);

    grunt.registerTask('analyze', ['eslint:analyze']);
    grunt.registerTask('unit', ['clean:unit', 'karma:unit']);
    grunt.registerTask('compile', ['clean:compile', 'copy:compile', 'babel:compile']);
    grunt.registerTask('pack', ['requirejs:pack', 'uglify:pack', 'clean:pack']);
    grunt.registerTask('min', ['string-replace:min', 'uglify:min', 'string-replace:post-min']);

    grunt.registerTask('test', ['analyze', 'unit']);
    grunt.registerTask('develop', ['test', 'watch:develop']);

    grunt.registerTask('build', ['test', 'compile', 'pack', 'min', 'rename:build']);
    grunt.registerTask('debug', ['build', 'watch:debug']);
};
