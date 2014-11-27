module.exports = function(grunt) {
 
  // project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      },
      build: ['gruntfile.js', 'src/js/*.js']
    },
    less: {
      build: {
        options: {
          paths: ['less', 'components/bootstrap/less']
        },
        files: {
          'tmp/css/styles.css':'src/less/main.less' 
        }
      }
    },
	concat: {
	  options: {
		  separator: ';'
	  },
	  js: {
		  src: ['src/components/jquery/dist/jquery.js',
			    'src/components/bootstrap/dist/js/bootstrap.js',
			    'src/js/*.js'],
		  dest: 'tmp/js/<%= pkg.name %>.js'
	  },
	  css: {
		  src: ['src/css/*.css',
			    'tmp/css/styles.css'],
		  dest: 'tmp/css/styles.css'
	  }
	},
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      build: {
        files: {
          'tmp/js/<%= pkg.name %>.min.js': ['<%= concat.build.dest %>']
        }
      }
    },
    compress: {
      // example build target for static resources
      build: {
        options: {
          mode: 'zip',
          archive:'build/staticresources/<%= pkg.name %>.resource'
        },
        files:[
          {expand: true, src: ['**/*'], cwd:'tmp/'}
        ]
      }
    },
    copy: {
      main: {
        files: [
			{ expand: true, cwd: 'src/',
			  src: ['img/*'],
			  dest: 'tmp/'
			},
	        { expand: true, flatten: true, cwd: 'src/',
		        src: ['images/*'],
		        dest: 'tmp/images/'
	        },
	        { expand: true, flatten: true, cwd: 'src/',
		        src: ['components/bootstrap/dist/fonts/*'],
		        dest: 'tmp/fonts/'
	        }
        ]
      }
    },
    antdeploy: {
      // define global options for all deploys
      options: {
        root: 'build/',
        version: '27.0'
      },
      // create individual deploy targets. these can be 
      // individual orgs or even the same org with different packages
      dev1:  {
        options: {
          user: 'yourusername',
          pass: 'yourpassword',
          serverurl: 'https://test.salesforce.com'
        },
        pkg: {
          staticresource: ['*']
        }
      }
    },
    clean: {
      build: ['tmp', 'build/package.xml']
    },
    watch: {
      files: 'src/**/*',
      tasks: ['all']
    }    
  });
 
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-ant-sfdc');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  // custom task to write the -meta.xml file for the metadata deployment
  grunt.registerTask('write-meta', 'Write the required salesforce metadata', function() {
    grunt.log.writeln('Writing metadata...');
    var sr = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">',
      '  <cacheControl>Public</cacheControl>',
      '  <contentType>application/zip</contentType>',
      '  <description>Assets</description>',
      '</StaticResource>'
    ];
    var dest = grunt.template.process('<%= compress.build.options.archive %>') + '-meta.xml';
    grunt.file.write(dest, sr.join('\n'));
  });
 
  // default task (no deploy)
  //grunt.registerTask('default', ['clean', 'jshint', 'concat', 'less', 'copy', 'compress', 'write-meta','antdeploy' ]); //'uglify',
  grunt.registerTask('default', ['clean', 'jshint', 'less', 'concat', 'copy', 'compress', 'write-meta']);

	// 'all' task including deploy
  grunt.registerTask('all', ['default', 'antdeploy']);

  
};