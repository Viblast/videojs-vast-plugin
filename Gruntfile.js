'use strict';

var specs = "spec/*Spec.js",
    helpers = "spec/*Helpers.js";

var _ = require('lodash');

var src = [
  "videojs.viblast.js",
  "lib/videojs-contrib-ads/videojs.ads.js",
  "lib/vast-client.js",
  "videojs.vast.js",
];

var src_css = [
  "lib/videojs-contrib-ads/videojs.ads.css",
  "videojs.vast.css",
];

var gruntConfig = {
  env: {
    // dynamically filled
  },
  jshint: {
    ignore_warning: {
      options: {
        '-W083': true,
      },
      src: ['videojs.vast.js', specs],
    }, 
  },
  // jasmine: {
  //   src: 'videojs.vast.js',
  //   options: {
  //     specs: specs,
  //     helpers: helpers,
  //     vendor: [
  //       "http://vjs.zencdn.net/4.4.3/video.js",
  //       "bower_components/videojs-contrib-ads/src/videojs.ads.js",
  //       "lib/vast-client.js"
  //     ]
  //   }
  // },
  karma: {
    unit: {
      configFile: 'karma.conf.js'
    }
  },
  coveralls: {
    options: {
      coverage_dir: './coverage',
      force: true,
      recursive: true
    }
  },
  connect: {
    server: {
      options: {
        keepalive: true
      }
    }
  },
  watch: {
    scripts: {
      files: ['*.js', 'spec/*.js'],
      tasks: ['jshint', 'jasmine']
    },
  },
  uglify: {
    viblast_vast: {
      files: {
        'dist/videojs.viblast-vast.js': src
      }
    }
  },
  concat: {
	viblast_vast_css: {
	  src: src_css,
	  dest: 'dist/videojs.viblast-vast.css',
	},
  },
};

module.exports = function(grunt) {
  grunt.initConfig(gruntConfig);

  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-karma-coveralls');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');

  if (typeof desireds !== 'undefined') {
	  grunt.registerTask('default', ['test:sauce:' + _(desireds).keys().first()]);
	
	  _(desireds).each(function(desired, key) {
	    grunt.registerTask('test:sauce:' + key, ['env:' + key, 'simplemocha:sauce']);
	  });
  }

  grunt.registerTask('default', ['jshint', 'karma']);
  grunt.registerTask('viblast-vast', ['uglify:viblast_vast', 'concat:viblast_vast_css']);
};
