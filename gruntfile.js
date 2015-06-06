var Babel = require('babel');

module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            compile: {
                cwd: 'obj',
                dest: 'obj',
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
            restore: {
                options: {
                    cleanBowerDir: true,
                    cleanTargetDir: true,
                    layout: 'byComponent',
                    targetDir: 'lib'
                }
            }
        },
        clean: {
            compile: ['obj', 'bin'],
            pack: ['obj/**/*', '!obj/<%= pkg.name %>.js'],
            reset: ['obj', 'bower_components', 'bin', 'lib', 'node_modules']
        },
        copy: {
            compile: {
                cwd: 'src',
                dest: 'obj',
                expand: true,
                src: '**/*.js'
            }
        },
        jshint: {
            analyze: {
                cwd: 'src',
                expand: true,
                src: '**/*.js',
                options: {
                    jshintrc: true,
                    reporter: require('jshint-summary'),
                }
            }
        },
        karma: {
            test: {
                options: {
                    babelPreprocessor: {
                        options: {
                            comments: false,
                            modules: 'amd',
                            sourceMap: 'inline'
                        }
                    },
                    browsers: ['PhantomJS'],
                    files: [
                        { pattern: 'lib/**/*.js' },
                        { pattern: 'src/**/*.js' },
                        { pattern: 'test/spec/**/*.js' }
                    ],
                    frameworks: ['jasmine'],
                    preprocessors: {
                        'src/**/*.js': ['babel'],
                        'test/spec/**/*.js': ['babel']
                    },
                    singleRun: true
                }
            }
        },
        pkg: grunt.file.readJSON('package.json'),
        rename: {
            build: {
                src: 'obj',
                dest: 'bin'
            }
        },
        requirejs: {
            pack: {
                options: {
                    baseUrl: 'obj/_Properties',
                    name: '<%= pkg.name %>',
                    onBuildWrite: function(moduleName, path, contents) {
                        var name = grunt.config.get('pkg.name');

                        return (moduleName === name) ? '' : contents.replace('define(\'../', 'define(\'' + name + '/');
                    },
                    optimize: 'none',
                    out: 'obj/<%= pkg.name %>.js',
                    paths: {},
                    wrap: {
                        start: Babel.buildExternalHelpers() + '\n'
                    }
                }
            }
        },
        'string-replace': {
            min: {
                dest: 'obj/<%= pkg.name %>.js',
                src: 'obj/<%= pkg.name %>.js',
                options: {
                    replacements: [{
                        pattern: /_Debug\['default'\]\.assert\(/g,
                        replacement: '//_Debug[\'default\'].assert('
                    }]
                }
            },
            'post-min': {
                dest: 'obj/<%= pkg.name %>.js',
                src: 'obj/<%= pkg.name %>.js',
                options: {
                    replacements: [{
                        pattern: /\/\/_Debug\['default'\]\.assert\(/g,
                        replacement: '_Debug[\'default\'].assert('
                    }]
                }
            }
        },
        uglify: {
            min: {
                dest: 'obj/<%= pkg.name %>.min.js',
                src: 'obj/<%= pkg.name %>.js',
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */',
                    quoteStyle: 1,
                    sourceMap: true
                }
            },
            pack: {
                dest: 'obj/<%= pkg.name %>.js',
                src: 'obj/<%= pkg.name %>.js',
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n\n',
                    beautify: {
                        beautify: true,
                        width: 200
                    },
                    compress: false,
                    mangle: false,
                    quoteStyle: 1,
                }
            }
        },
        watch: {
            debug: {
                files: ['src/**'],
                tasks: ['build']
            }
        }
    });

    grunt.registerTask('reset', ['clean:reset']);
    grunt.registerTask('restore', ['bower:restore']);
    grunt.registerTask('analyze', ['jshint:analyze']); // TODO jscs
    grunt.registerTask('test', [/*'karma:test'*/]);
    grunt.registerTask('compile', ['clean:compile', 'copy:compile', 'babel:compile']);
    grunt.registerTask('pack', ['requirejs:pack', 'uglify:pack', 'clean:pack']);
    grunt.registerTask('min', ['string-replace:min', 'uglify:min', 'string-replace:post-min']);

    grunt.registerTask('build', ['analyze', 'compile', 'test', 'pack', 'min', 'rename:build']);
    grunt.registerTask('debug', ['restore', 'build', 'watch:debug']);
};
