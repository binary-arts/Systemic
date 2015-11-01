/* jshint node:true */

var Path = require('path');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    var pkg = grunt.file.readJSON('package.json');

    var dir = {
        coverage: 'test/coverage',
        dep: 'obj/lib',
        out: 'bin',
        pkg: {
            bower: 'bower_components',
            node: 'node_modules'
        },
        spec: 'test/spec',
        specdep: 'test/lib',
        src: 'src',
        work: 'obj',
    };

    var file = {
        babelRuntime: Path.join(dir.pkg.node, 'babel/node_modules/babel-core/external-helpers.js'),
        es6Runtime: Path.join(dir.pkg.node, 'babel/node_modules/babel-core/browser-polyfill.js'),
        out: {
            debug: Path.join(dir.work, pkg.name + '.js'),
            min: Path.join(dir.work, pkg.name + '.min.js')
        },
    };

    var files = {
        src: Path.join(dir.src, '**/*.js'),
        spec: Path.join(dir.spec, '**/*.js'),
        specdep: Path.join(dir.specdep, '**/*.js'),
        work: Path.join(dir.work, '**/*.js')
    };

    grunt.initConfig({
        babel: {
            compile: {
                cwd: dir.work,
                dest: dir.work,
                expand: true,
                src: '**/*.js',
                options: {
                    comments: false,
                    externalHelpers: true,
                    modules: 'amd'
                }
            }
        },
        bower: {
            pack: {
                options: {
                    install: false,
                    layout: 'byComponent',
                    targetDir: dir.dep
                }
            },
            unit: {
                options: {
                    install: false,
                    layout: 'byComponent',
                    targetDir: dir.specdep
                }
            }
        },
        clean: {
            compile: [dir.work, dir.out],
            pack: [Path.join(dir.work, '**/*'), '!' + file.out.debug],
            reset: [dir.coverage, dir.out, dir.pkg.bower, dir.pkg.node, dir.specdep, dir.work],
            unit: [dir.coverage, dir.specdep]
        },
        copy: {
            compile: {
                cwd: dir.src,
                dest: dir.work,
                expand: true,
                src: '**/*.js'
            }
        },
        jshint: {
            analyze: {
                cwd: dir.src,
                expand: true,
                src: '**/*.js',
                options: {
                    jshintrc: true,
                    reporter: require('jshint-summary')
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
                        { pattern: files.specdep, included: false },
                        { pattern: file.es6Runtime, included: true },
                        { pattern: file.babelRuntime, included: true },
                        { pattern: 'test/Systemic.js', included: true }
                    ],
                    frameworks: ['jasmine', 'requirejs'],
                    logLevel: 'WARN',
                    preprocessors: (function () {
                        var result = Object.create(null);

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
                    baseUrl: Path.join(dir.work, '_Properties'),
                    name: pkg.name,
                    onBuildWrite: function(moduleName, path, contents) {
                        return moduleName === pkg.name ? '' : contents.replace('define(\'../', 'define(\'' + pkg.name + '/');
                    },
                    optimize: 'none',
                    out: file.out.debug,
                    paths: {
                        jquery: 'empty:'
                    },
                    wrap: {
                        start: grunt.file.read(file.es6Runtime) + '\n' + grunt.file.read(file.babelRuntime) + '\n'
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
                banner: ['/*! ', pkg.name, ' - v', pkg.version, ' - ', grunt.template.today('yyyy-mm-dd'), ' */\n\n'].join(''),
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

    grunt.registerTask('analyze', ['jshint:analyze']);
    grunt.registerTask('unit', ['clean:unit', 'bower:unit', 'karma:unit']);
    grunt.registerTask('compile', ['clean:compile', 'copy:compile', 'babel:compile']);
    grunt.registerTask('pack', ['requirejs:pack', 'uglify:pack', 'clean:pack', 'bower:pack']);
    grunt.registerTask('min', ['string-replace:min', 'uglify:min', 'string-replace:post-min']);

    grunt.registerTask('test', ['analyze', 'unit']);
    grunt.registerTask('develop', ['test', 'watch:develop']);

    grunt.registerTask('build', ['test', 'compile', 'pack', 'min', 'rename:build']);
    grunt.registerTask('debug', ['build', 'watch:debug']);
};
