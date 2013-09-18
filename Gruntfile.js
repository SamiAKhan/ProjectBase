module.exports = function(grunt) {
	// Demandware Structure
	var demandware = grunt.file.readJSON('demandware.json');

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		compass: {
			options: {
				sassDir: demandware.cartridges.project + '/' + demandware.path.scssDir,
				cssDir: demandware.cartridges.project + '/' + demandware.path.cssDir,
				imagesDir: demandware.cartridges.project + '/' + demandware.path.imagesDir,
				javascriptsDir: demandware.cartridges.project + '/' + demandware.path.scriptsDir,
				fontsDir: demandware.cartridges.project + '/' + demandware.path.fontsDir,
				relativeAssets: true,
				outputStyle: 'expanded'
			},
			fluid: {
				options: {
					sassDir: demandware.cartridges.fluid + '/' + demandware.path.scssDir
				}
			},
			project: {}
		},
		csslint: {
			options: {
				'important': true,
				'adjoining-classes': false,
				'known-properties':true,
				'box-sizing': false,
				'box-model': false,
				'overqualified-elements': true,
				'display-property-grouping': true,
				'bulletproof-font-face': true,
				'compatible-vendor-prefixes': true,
				'regex-selectors': true,
				'errors': true,
				'duplicate-background-images': true,
				'duplicate-properties': true,
				'empty-rules': true,
				'selector-max-approaching': true,
				'gradients': true,
				'fallback-colors': true,
				'font-sizes': true,
				'font-faces': true,
				'floats': true,
				'star-property-hack': true,
				'outline-none': false, // None: allow outline none.
				'import': true,
				'ids': true, // Best practice do not use IDs in CSS ever due to strength of cascade.
				'underscore-property-hack': true,
				'rules-count': true,
				'qualified-headings': true,
				'selector-max': true,
				'shorthand': true,
				'text-indent': true,
				'unique-headings': true,
				'universal-selector': true,
				'unqualified-attributes': true,
				'vendor-prefix': true,
				'zero-units': true
			},
			project: {
				src: [
					demandware.cartridges.project + '/' + demandware.path.cssDir + '/**/*.css',
					'!' + demandware.cartridges.project + '/' + demandware.path.cssDir + '/lib/**/*.css'
				]
			}
		},
        jshint: {
            options: {
				curly: true,
				eqeqeq: true,
				eqnull: true,
				browser: true,
				globals: {
					jQuery: true
				},
				force: true
            },
            project: {
				src: [
					'Gruntfile.js',
					demandware.cartridges.project + '/' + demandware.path.scriptDir + '/{,*/}*.js',
					'!' + demandware.cartridges.project + '/' + demandware.path.scriptDir + '/lib/{,*/}*.js'
				]
			}
		},
        concat: {
			options: {
				'banner': "'use strict';\n",
				'process': function(src, filepath) {
					return '// Source: ' + filepath + '\n' + src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
				}
			},
			fluidapp: {
				src: [demandware.cartridges.fluid + '/' + demandware.path.scriptDir + '/app/{,*/}*.js'],
				dest: demandware.cartridges.project + '/' + demandware.path.scriptDir + '/app-fluid.js'
			},
			projectapp: {
				src: [demandware.cartridges.project + '/' + demandware.path.scriptDir + '/app/{,*/}*.js'],
				dest: demandware.cartridges.project + '/' + demandware.path.scriptDir + '/app-puma.js'
			},
			projectglobal: {
				src: [demandware.cartridges.project + '/' + demandware.path.scriptDir + '/global/{,*/}*.js'],
				dest: demandware.cartridges.project + '/' + demandware.path.scriptDir + '/global.js'
			}
		},
		watch: {
			compass: {
				files: ['**/*.scss'],
				tasks: ['compile-sass']
			},
			concat: {
				files: [
					demandware.cartridges.fluid + '/' + demandware.path.scriptDir + '/app/{,*/}*.js',
					demandware.cartridges.project + '/' + demandware.path.scriptDir + '/app/{,*/}*.js',
					demandware.cartridges.project + '/' + demandware.path.scriptDir + '/global/{,*/}*.js'
				],
				tasks: ['compile-js']
			},
			compress: {
				files: [demandware.cartridges.project + '/' + demandware.path.imagesDir + '/{,**/}*.{png,jpg,jpeg}'],
				tasks: ['imagemin:project']
			}
		},
		open: {
			login: {
				path: 'http://' + demandware.server.host + '/' + demandware.server.basePath + '/' + demandware.server.panel + '/' + demandware.server.noLocale +'/ViewApplication-DisplayLogin'
			},
			project: {
				path: 'http://' + demandware.server.host + '/' + demandware.server.basePath + '/' + demandware.server.site + '/' + demandware.server.defaultLocale + '/'
			}
		},
        imagemin: {
			options: {
				optimizationLevel: 3
			},
            fluid: {
                files: [{
                    expand: true,
                    cwd: demandware.cartridges.fluid + '/' + demandware.path.imagesDir + '/',
                    src: '{,**/}*.{png,jpg,jpeg}',
                    dest: demandware.cartridges.project + '/' + demandware.path.imagesDir + '-compressed/'
                }]
            },
            project: {
                files: [{
                    expand: true,
                    cwd: demandware.cartridges.project + '/' + demandware.path.imagesDir + '/',
                    src: '{,**/}*.{png,jpg,jpeg}',
                    dest: demandware.cartridges.project + '/' + demandware.path.imagesDir + '-compressed/'
                }]
            }
        },
        gitclone: {
			fluid: {
				options: {
					repo: demandware.repos.fluid.clone,
					branch: demandware.repos.fluid.branch,
					directory: demandware.repos.fluid.directory
				}
			},
			sitegenesis: {
				options: {
					repo: demandware.repos.sitegenesis.clone,
					branch: demandware.repos.sitegenesis.branch,
					directory: demandware.repos.sitegenesis.directory
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-git');


    // Tasks
	grunt.registerTask('clone', ['gitclone']);

	grunt.registerTask('lint', ['jshint:project', 'csslint:project']);

	grunt.registerTask('compress', ['imagemin:fluid', 'imagemin:project']);

	grunt.registerTask('compile-sass', ['compass:fluid', 'compass:project']);

	grunt.registerTask('compile-js', ['concat:fluidapp', 'concat:projectapp', 'concat:projectglobal']);

    grunt.registerTask('compile', ['compile-sass', 'compile-js', 'compress']);

    grunt.registerTask('server', ['compile', 'watch']);

    grunt.registerTask('default', ['server', 'open:login', 'open:project']);
};