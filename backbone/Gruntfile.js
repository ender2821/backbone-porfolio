module.exports = function(grunt) {
  // var amdclean = require('amdclean'),
  //   fs = require('fs'),
  //   amdcleanLogic = function (data) {
  //     var outputFile = data.path;
  //     fs.writeFileSync(outputFile, amdclean.clean({
  //       'code': fs.readFileSync(outputFile),
  //       'globalObject': true,
  //       'globalObjectName': 'BRB',
  //       'rememberGlobalObject': false,
  //       'removeModules': ['text'],
  //       'prefixTransform': function(moduleName) {
  //         return moduleName.substring(moduleName.lastIndexOf('_') + 1, moduleName.length);
  //       },
  //       'wrap': {
  //         'start': '(function() {\n',
  //         'end': '\n}());'
  //       }
  //     }));
  //   };
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    requirejs: {
      mobileJS: {
        options: {
          baseUrl: 'public/js/app',
          paths: {
            'mobile': 'init/MobileInit'
          },
          wrap: true,
          // name: "../libs/almond",
          // onModuleBundleComplete: amdcleanLogic,
          preserveLicenseComments: false,
          optimize: 'uglify',
          optimizeCss: 'standard',
          mainConfigFile: 'public/js/app/config/config.js',
          include: ['mobile'],
          out: 'public/js/app/init/MobileInit.min.js'
        }
      },
      mobileCSS: {
        options: {
          optimizeCss: 'standard',
          cssIn: './public/css/mobile.css',
          out: './public/css/mobile.min.css'
        }
      },
      desktopJS: {
        options: {
          baseUrl: 'public/js/app',
          paths: {
            'desktop': 'init/DesktopInit'
          },
          wrap: true,
          // name: "../libs/almond",
          // onModuleBundleComplete: amdcleanLogic,
          preserveLicenseComments: false,
          optimize: 'uglify',
          mainConfigFile: 'public/js/app/config/config.js',
          include: ['desktop'],
          out: 'public/js/app/init/DesktopInit.min.js'
        }
      },
      desktopCSS: {
        options: {
          optimizeCss: 'standard',
          cssIn: './public/css/desktop.css',
          out: './public/css/desktop.min.css'
        }
      }
    },
    jshint: {
      files: ['!Gruntfile.js', 'public/js/app/**/*.js', '!public/js/app/**/*min.js'],
      options: {
        globals: {
          jQuery: true,
          console: false,
          module: true,
          document: true
        }
      }
    },
    watch: {
      // scripts: {
      //   files: ['**/*.js'],
      //   tasks: ['jshint'],
      //   options: {
      //     spawn: false,
      //   },
      // },
      src: {
        files: ['lib/*.js', 'css/**/*.scss', '!lib/dontwatch.js'],
        tasks: ['default'],
      },
      css: {
        files: ['public/scss/*.scss'],
        tasks: ['compass'],
      },
    },
    // plato: {
    //   your_task: {
    //     options : {
    //         exclude: /\.min\.js$/    // excludes source files finishing with ".min.js"
    //     },
    //     files: {
    //         'public/reports': ['public/js/app/**/*.js']
    //     }
    //   }
    // }
    express: {
      options: {
        // Override the command used to start the server.
        // (do not use 'coffee' here, the server will not be able to restart
        //  see below at opts for coffee-script support)
        cmd: process.argv[0],

        // Will turn into: `node OPT1 OPT2 ... OPTN path/to/server.js ARG1 ARG2 ... ARGN`
        // (e.g. opts: ['node_modules/coffee-script/bin/coffee'] will correctly parse coffee-script)
        opts: [ ],
        args: [ ],

        // Setting to `false` will effectively just run `node path/to/server.js`
        background: true,

        // Called when the spawned server throws errors
        fallback: function() {},

        // Override node env's PORT
        port: 3000,

        // Override node env's NODE_ENV
        node_env: undefined,

        // Enable Node's --harmony flag
        harmony: false,

        // Consider the server to be "running" after an explicit delay (in milliseconds)
        // (e.g. when server has no initial output)
        delay: 0,

        // Regular expression that matches server output to indicate it is "running"
        output: ".+",

        // Set --debug (true | false | integer from 1024 to 65535, has precedence over breakOnFirstLine)
        debug: false,

        // Set --debug-brk (true | false | integer from 1024 to 65535)
        breakOnFirstLine: false,

        // Object with properties `out` and `err` both will take a path to a log file and
        // append the output of the server. Make sure the folders exist.
        logs: undefined

      }
    }
  });

  grunt.registerTask('desktopBuild', function() {
    grunt.task.run(['requirejs:desktopJS', 'requirejs:desktopCSS']);
  });

  grunt.registerTask('mobileBuild', function() {
    grunt.task.run(['requirejs:mobileJS', 'requirejs:mobileCSS']);
  });

  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // grunt.loadNpmTasks('grunt-plato');
   
  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('minify', ['requirejs:desktopJS', 'requirejs:mobileJS']);
  // grunt.registerTask('complexity:report', '');
  grunt.registerTask('build', ['desktopBuild', 'mobileBuild']);
  grunt.registerTask('default', ['test', 'build','express']);
  grunt.registerTask('express', [ 'express:dev', 'watch' ]);

// var express = require("express"),
    var PORT = 400;
    var http = require("http");
    var connect = require("connect");
    var app = connect();
    // Logging middleware
    app.use(function(request, response, next) {
     console.log("In comes a " + request.method + " to " + request.url);
     next();
    });

    // Send "hello world"
    app.use(function(request, response) {
      response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello world!\n");
    });

    var server = http.createServer(app).listen( PORT, function() {
      console.log('Express server listening on port ' + PORT);
    } );

};