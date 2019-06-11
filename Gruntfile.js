/* eslint-disable @typescript-eslint/no-var-requires */

const sass = require("sass");

module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    babel: {
      options: {
        sourceMap: false,
        presets: ["@babel/preset-env"]
      },
      dist: {
        files: [{
          expand: true,
          cwd: "./src/assets/js",
          src: ["*.js"],
          dest: "./public/js"
        }]
      }
    },
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
          cwd: "./public/js",
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
        tasks: ["babel", "uglify"],
      }
    }
  });

  grunt.loadNpmTasks("grunt-babel");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["babel", "uglify", "sass"]);
};
