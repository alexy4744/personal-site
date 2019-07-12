/* eslint-disable @typescript-eslint/no-var-requires */

const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
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
    postcss: {
      options: {
        map: false,
        processors: [
          autoprefixer(),
          cssnano()
        ]
      },
      dist: {
        src: "public/**/*.css"
      }
    },
    watch: {
      css: {
        files: "./src/assets/scss/**/*.scss",
        tasks: ["sass"]
      }
    }
  });

  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["sass", "postcss"]);
};
