'use strict';

module.exports = function(grunt) {
  grunt.initConfig({
  	
  	timestamp: new Date().getTime(),
  	target_folder: 'dest',
  	app_js_name: 'application_<%= timestamp %>',
  	lib_js_name: 'library_<%= timestamp %>',
  	lib_resources: [],

	clean: {
        build: {
            dot: true,
            src: [ '<%= target_folder %>/**/*' ]
        }
    },

  	concat: {
  		js: {
	  		src: ['app/src/**/*.js'],
            dest: '<%= target_folder %>/src/<%= app_js_name %>.js',
            options: {
                separator: '\n;'
            }
  		},
  		lib: {
  			src: '<%= lib_resources %>',
  			dest: '<%= target_folder %>/lib/<%= lib_js_name %>.js',
  			options: {
  				separator: ';\n'
  			}
  		}
  	},

    uglify: {
        '<%= target_folder %>/src/<%= app_js_name %>.min.js': '<%= target_folder %>/src/<%= app_js_name %>.js',
        options: {
			mangle: false
		},
    },

    copy: {
    	build:{
    		files:[{
    			cwd: 'app/',
    			dest: '<%= target_folder %>/',
    			expand: true,
    			src: ['main.html','views/**','lib/**']
    		}]
    	}
    },

    replace: {
      app_js: {
        options: {
          patterns: [
            {
              match: /\<\!\-\-BEGIN\_APP[\s\S]*END\_APP\-\-\>/,
              replacement: function(matchedString){
              	
              	var app_name 	= grunt.config('app_js_name');
              	var script_src 	= '<script type="application/javascript" src="src/'+app_name+'.min.js"></script>';

              	return script_src;
              }
            },
            {
            	match: /\<\!\-\-BEGIN\_LIB[\s\S]*END\_LIB\-\-\>/,

            	//Script baseado em:
            	//http://www.thoughtdelimited.org/thoughts/post.cfm/using-grunt-to-concatenate-only-the-js-css-files-used-in-index-html
            	replacement: function(matchedString){
            		try {
	            		var lib_js_name = grunt.config('lib_js_name');
	            		var jsArray = matchedString.match( /(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/g );
	            		var script_src = '<script type="application/javascript" src="lib/'+lib_js_name+'.js"></script>';
	            		var targetConfig = grunt.config('lib_resources');
	            		jsArray.forEach( function( element ) {
		            		var resourceTarget = element.match( /(src\s?\=\s?[\'\"])([^\'\"]*)([\'\"])/ )[ 2 ];
		                    targetConfig.push( 'app/' + resourceTarget );
		                    grunt.config( 'lib_resources', targetConfig );
		                });
	            		return script_src;
            		}catch(e){
            			console.log(e);
            			throw e;
            		}
            	}
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['app/main.html'], dest: '<%= target_folder %>/'}
        ]
      }
    },

    shell: {
		express: {
			options:{
				stdout: true
			},
			command: 'nodemon server.js'
		},
		express_dist: {
			options:{
				stdout: true
			},
			command: 'nodemon server-dist.js'	
		}
	}
     
  });
 
  // carrega plugins
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-shell');
  
  grunt.registerTask('default',['build']);

  grunt.registerTask('build',"Realiza build",function(){
  	grunt.task.run(['clean','concat:js','uglify','copy','replace','concat:lib']);
  })

  grunt.registerTask('server','Serve a local NodeJS Server with express',function(){
  	grunt.task.run(['shell:express']);
  });

  grunt.registerTask('server-dist','Serve a local NodeJS Server with express',function(){
  	grunt.task.run(['build','shell:express_dist']);
  });
  
};