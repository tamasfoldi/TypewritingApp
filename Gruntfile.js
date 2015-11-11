module.exports = function (grunt) {

  grunt.initConfig({
    tslint: {
      options: {
        configuration: grunt.file.readJSON("tslint.json")
      },
      all: {
        src: ["**/*.ts", "!node_modules/**/*.ts", "!obj/**/*.ts", "!Scripts/typings/**/*.ts", '!Specs/**/*.ts', "!references.ts"]
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
  grunt.registerTask('cleanbuild', ["tslint:all", "ts:build", "concurrent:watchers"]);

};