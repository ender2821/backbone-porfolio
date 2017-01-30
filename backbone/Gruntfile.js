module.exports = function(grunt) {
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
    //
    'http-server': {

        'dev': {

            // the server root directory
            root: "public",

            // the server port
            // can also be written as a function, e.g.
            // port: function() { return 8282; }
            port: 40,

            // the host ip address
            // If specified to, for example, "127.0.0.1" the server will
            // only be available on that ip.
            // Specify "0.0.0.0" to be available everywhere
            host: "127.0.0.1",

            cache: 0,
            showDir : true,
            autoIndex: true,

            // server default file extension
            ext: "html",

            // run in parallel with other tasks
            runInBackground: false,

            // specify a logger function. By default the requests are
            // sent to stdout.
            // logFn: function(req, res, error) { },

            // Proxies all requests which can't be resolved locally to the given url
            // Note this this will disable 'showDir'
            proxy: "http://someurl.com",

            /// Use 'https: true' for default module SSL configuration
            /// (default state is disabled)
            // https: {
            //     cert: "cert.pem",
            //     key : "key.pem"
            // },

            // Tell grunt task to open the browser
            openBrowser : false,

            // customize url to serve specific pages
            // customPages: {
            //     "/readme": "README.md",
            //     "/readme.html": "README.html"
            // }

        }

    },
    // express: {
    // server: {
    //   options: {
    //     port: 9001,
    //     bases: ['public', 'dist']
    //   }
    // }
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
  // grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-http-server');

  // grunt.loadNpmTasks('grunt-plato');

  grunt.registerTask('test', ['jshint']);
  grunt.registerTask('minify', ['requirejs:desktopJS', 'requirejs:mobileJS']);
  // grunt.registerTask('complexity:report', '');
  grunt.registerTask('build', ['desktopBuild', 'mobileBuild']);
  grunt.registerTask('default', ['test', 'build','http-server']);
  // grunt.registerTask('express', [ 'express:dev', 'watch' ]);

// // var express = require("express"),
//     var PORT = 40;
//     var http = require("http");
    // var connect = require("connect");
    // var app = connect();
    // Logging middleware
    // app.use(function(request, response, next) {
    //  console.log("In comes a " + request.method + " to " + request.url);
    //  next();
    // });

    // Send "hello world"
    // app.use(function(request, response) {
    //   response.writeHead(200, { "Content-Type": "text/plain" });
    //   response.end("Hello world!\n");
    // });
  // var app = require('express')();

  //   var server = http.createServer(app).listen( PORT, function() {
  //     console.log('Express server listening on port ' + PORT);
  //   } );


  //     // , server = require('http').createServer(app);
  //   //   // , io = require('socket.io').listen(server);

  //   app.get('/', function (req, res) {
  //          console.log("In comes a " + req.method + " to " + req.url);

  //     res.sendfile('public/index.html');
  //   });

    // io.sockets.on('connection', function (socket) {
    //   socket.emit('news', { hello: 'world' });
    //   socket.on('my other event', function (data) {
    //     console.log(data);
    //   });
    // });

    // exports = module.exports = server;
    // // delegates use() function
    // exports.use = function() {
    //   app.use.apply(app, arguments);
    // };



  };




// });

