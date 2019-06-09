/* eslint-disable @typescript-eslint/no-var-requires */

const sass = require("sass");

module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    sass: {
      options: {
        implementation: sass,
        sourceMap: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: "./src/assets/scss",
          src: ["*.scss"],
          dest: "./public/css/",
          ext: ".css"
        }]
      }
    },
    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> <%= grunt.template.today(\"yyyy-mm-dd\") %> */\n",
        output: {
          comments: false
        }
      },
      build: {
        files: [{
          expand: true,
          cwd: "./src/assets/js",
          src: ["*.js"],
          dest: "./public/js"
        }]
      }
    },
    watch: {
      css: {
        files: "./src/assets/scss/*.scss",
        tasks: ["sass"]
      },
      js: {
        files: "./src/assets/js/*.js",
        tasks: ["uglify"],
      },
      options: {
        livereload: {
          host: "localhost",
          port: 8081
        }
      }
    }
  });

  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["sass", "uglify"]);
};
