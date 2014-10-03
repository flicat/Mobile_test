module.exports = function (grunt) {

    grunt.initConfig({
        pkg : grunt.file.readJSON("package.json"),
        uglify : {
            options : {
                mangle: {
                    except: ['require', 'exports', 'module', 'define']
                },
                banner : '/*! @author: flicat.li@wintour.cn */\n'
            },
            base : {
                files: [
                    {
                        'assets/js/apps/base/seajs-config.js': 'assets/js/apps/base/seajs-config-debug.js',
                        'assets/js/apps/base/public-min.js': 'assets/js/apps/base/public.js'
                    }
                ]
            },
            lang : {
                files: [
                    {
                        expand: true,
                        cwd: 'assets/js/apps/lang/',
                        src : ['*.js', '!*debug.js', '!*min.js'],
                        dest: 'assets/js/apps/lang/',
                        ext: '-min.js'
                    }
                ]
            },
            plugins : {
                files : [
                    {
                        expand: true,
                        cwd : 'assets/js/apps/plugins/',
                        src : ['**/*.js', '**/**/*.js', '!**/*min.js', '!**/**/*min.js', '!**/*debug.js', '!**/**/*debug.js'],
                        filter : 'isFile',
                        dest : 'assets/js/apps/plugins/',
                        ext: '-min.js'
                    }
                ]
            },
            saas : {
                files : [
                    {
                        expand: true,
                        cwd : 'assets/js/apps/saas/',
                        src : ['**/*.js', '!**/*min.js', '!**/*debug.js'],
                        filter : 'isFile',
                        dest : 'assets/js/apps/saas/',
                        ext: '-min.js'
                    }
                ]
            },
            wap : {
                files : [
                    {
                        expand: true,
                        cwd : 'assets/js/apps/wap/',
                        src : ['*.js', '!*min.js', '!*debug.js'],
                        filter : 'isFile',
                        dest : 'assets/js/apps/wap/',
                        ext: '-min.js'
                    }
                ]
            }
        },
        cssmin: {
            css: {
                files: [{
                    'assets/css/ds-min.css': 'assets/css/ds-debug.css',
                    'assets/css/en-us-min.css': 'assets/css/en-us-debug.css'
                }]
            }
        },
        watch: {
            base: {
                files: ['assets/js/apps/base/*.js'],
                tasks: ['uglify:base'],
                options: {
                    spawn: false
                }
            },
            lang: {
                files: ['assets/js/apps/lang/*.js'],
                tasks: ['uglify:lang'],
                options: {
                    spawn: false
                }
            },
            plugins: {
                files: ['assets/js/apps/plugins/**/**/*.js'],
                tasks: ['uglify:plugins'],
                options: {
                    spawn: false
                }
            },
            saas: {
                files: ['assets/js/apps/saas/**/*.js'],
                tasks: ['uglify:saas'],
                options: {
                    spawn: false
                }
            },
            wap: {
                files: ['assets/js/apps/wap/*.js'],
                tasks: ['uglify:wap'],
                options: {
                    spawn: false
                }
            },
            css: {
                files: ['assets/css/*.css'],
                tasks: ['cssmin:css'],
                options: {
                    spawn: false
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify', 'cssmin']);
};