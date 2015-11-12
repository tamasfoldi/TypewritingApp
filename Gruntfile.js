module.exports = function (grunt) {

  grunt.initConfig({
    tslint: {
      options: {
        configuration: grunt.file.readJSON("tslint.json")
      },
      all: {
        src: ["**/*.ts", "!node_modules/**/*.ts", "!Scripts/typings/**/*.ts", "!Specs/**/*.ts", "!references.ts"]
        // avoid linting typings files and node_modules files
      }
    },

    ts: {
      build: {
        src: ["references.ts", "**/*.ts", "!node_modules/**/*.ts"],
        reference: "references.ts",
        options: {
          module: "commonjs",
          fast: "never"
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['app/scripts/models/*.js', 'app/scripts/services/*.js', 'app/scripts/directives/*.js', 'app/scripts/controllers/*.js', 'app/scripts/app.js'],
        dest: 'app/scripts/typewriting.js'
      }
    },

    watch: {
      scripts: {
        files: ['**/*.ts', '!node_modules/**/*.ts'], // the watched files
        tasks: ["newer:tslint:all", "ts:build", "concat:dist"], // the task to run
        options: {
          spawn: false // makes the watch task faster
        }
      },
      karmawatch: {
        files: ['**/*.ts', '!node_modules/**/*.ts'], // the watched files
        tasks: ["ts:build", "concat:dist", "karma:unit"], // the task to run
      }
    },

    // watch our node server for changes
    nodemon: {
      dev: {
        script: 'server.js'
      },
      options: {
        ignore: ['node_modules/**', 'Gruntfile.js'],
        env: {
          PORT: '1337'
        }
      }
    },

    // run watch and nodemon at the same time
    concurrent: {
      watchers: {
        tasks: ['nodemon', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',        
      },
      continous: {
        configFile: 'karma.conf.js',
        reporters: 'junit'
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks("grunt-newer");
  grunt.loadNpmTasks("grunt-tslint");
  grunt.loadNpmTasks('grunt-ts');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-karma');


  grunt.registerTask('serve', ["concurrent:watchers"]);
  grunt.registerTask('conc', ["concat"]);
  grunt.registerTask('test', ["karma:unit", "watch:karmawatch"]);
  grunt.registerTask('circletest', ["ts:build", "concat", "karma:continous"]);
  grunt.registerTask('cleanbuild', ["tslint:all", "ts:build", "concat", "concurrent:watchers"]);

};