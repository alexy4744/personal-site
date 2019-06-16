/* eslint-disable @typescript-eslint/no-var-requires */

const autoprefixer = require("autoprefixer");
const babel = require("rollup-plugin-babel");
const cssnano = require("cssnano");
const nodeBuiltins = require("rollup-plugin-node-builtins");
const sass = require("sass");

module.exports = (grunt) => {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    rollup: {
      options: {
        plugins: () => [
          nodeBuiltins(),
          babel({
            exclude: "./node_modules/**",
            presets: ["@babel/preset-env"],
            sourceMap: false
          })
        ]
      },
      files: {
        dest: "public/js/main.bundle.js",
        src: "src/assets/js/main.js",
      },
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
      },
      js: {
        files: "./src/assets/js/**/*.js",
        tasks: ["rollup"],
      }
    }
  });

  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("grunt-rollup");
  grunt.loadNpmTasks("grunt-sass");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["rollup", "sass", "postcss"]);
};
